/*
============================================================
DPF OS — BOOK RETRIEVER
============================================================

Purpose
------------------------------------------------------------
Retrieve relevant knowledge from the canonical DPF book index.

IMPORTANT
------------------------------------------------------------
- DPF Books are the source of truth.
- This file reads the generated canonical book index.
- This file does NOT read PDFs per request.
- This file does NOT call an AI model.
- This file does NOT use a secondary knowledge registry.
- This file does NOT duplicate DPF knowledge.

Architecture
------------------------------------------------------------

DPF BOOKS
    ↓
dpf-book-index.json
    ↓
book-retriever.js
    ↓
context-resolver.js
    ↓
DPF Agent / Club Agent
    ↓
Prompt Builder
    ↓
AI Model

============================================================
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";


/*
============================================================
PATHS
============================================================
*/

const __filename =
  fileURLToPath(
    import.meta.url
  );

const __dirname =
  path.dirname(
    __filename
  );

const INDEX_FILE =
  path.join(
    __dirname,
    "index",
    "dpf-book-index.json"
  );


/*
============================================================
INDEX CACHE
============================================================

The generated book index is loaded once into memory.

We NEVER read the original PDFs during every request.

============================================================
*/

let cachedIndex = null;


/*
============================================================
LOAD BOOK INDEX
============================================================
*/

function loadBookIndex() {
  if (cachedIndex) {
    return cachedIndex;
  }

  if (
    !fs.existsSync(
      INDEX_FILE
    )
  ) {
    throw new Error(
      `DPF book index not found: ${INDEX_FILE}`
    );
  }

  const raw =
    fs.readFileSync(
      INDEX_FILE,
      "utf8"
    );

  try {
    cachedIndex =
      JSON.parse(
        raw
      );
  } catch (error) {
    throw new Error(
      `Invalid DPF book index JSON: ${error.message}`
    );
  }

  return cachedIndex;
}


/*
============================================================
TEXT NORMALIZATION
============================================================
*/

function normalize(
  value
) {
  return String(
    value || ""
  )
    .toLowerCase()
    .normalize(
      "NFKC"
    )
    .replace(
      /[^\p{L}\p{N}\s-]/gu,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}


/*
============================================================
TOKENIZATION
============================================================
*/

function tokenize(
  value
) {
  return normalize(
    value
  )
    .split(/\s+/)
    .filter(
      (token) =>
        token.length >= 2
    );
}


/*
============================================================
STOP WORDS
============================================================
*/

const STOP_WORDS =
  new Set([
    /*
    --------------------------------------------------------
    English
    --------------------------------------------------------
    */

    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "into",
    "about",
    "what",
    "how",
    "why",
    "are",
    "was",
    "were",
    "can",
    "could",
    "would",
    "should",
    "does",
    "do",
    "did",
    "its",
    "their",
    "there",
    "where",
    "when",
    "who",
    "which",
    "within",
    "through",
    "using",
    "your",
    "you",
    "our",
    "not",
    "but",
    "also",
    "than",
    "then",
    "more",
    "less",
    "between",
    "into",
    "over",
    "under",

    /*
    --------------------------------------------------------
    Arabic
    --------------------------------------------------------
    */

    "من",
    "في",
    "على",
    "عن",
    "إلى",
    "هذا",
    "هذه",
    "ذلك",
    "تلك",
    "كيف",
    "ما",
    "ماذا",
    "هو",
    "هي",
    "هم",
    "مع",
    "منه",
    "منها",
    "علي",
    "التي",
    "الذي",
    "الذين",
    "اللواتي",
    "هل",
    "لماذا",
    "متى",
    "أين",
    "و",
    "أو",
    "وهو",
    "وهي",
  ]);


/*
============================================================
MEANINGFUL TOKENS
============================================================
*/

function meaningfulTokens(
  value
) {
  return tokenize(
    value
  ).filter(
    (token) =>
      !STOP_WORDS.has(
        token
      )
  );
}


/*
============================================================
BOOK FILTERS
============================================================
*/

function matchesBookFilters(
  book,
  options
) {
  if (
    options.bookId &&
    book.bookId !==
      options.bookId
  ) {
    return false;
  }

  if (
    options.status &&
    book.status &&
    book.status !==
      options.status
  ) {
    return false;
  }

  if (
    options.authoritativeOnly &&
    book.authority !==
      "canonical"
  ) {
    return false;
  }

  return true;
}


/*
============================================================
CHUNK SCORING
============================================================

Deterministic lexical retrieval.

No embeddings.
No AI reasoning.
No model call.

The objective is to identify the most relevant
canonical book passages before the model is called.

============================================================
*/

function scoreChunk(
  queryTokens,
  chunk
) {
  const content =
    normalize(
      chunk.content
    );

  const title =
    normalize(
      chunk.title
    );

  const bookId =
    normalize(
      chunk.bookId
    );

  let score = 0;


  /*
  ----------------------------------------------------------
  TOKEN MATCHING
  ----------------------------------------------------------
  */

  for (
    const token of queryTokens
  ) {
    if (
      content.includes(
        token
      )
    ) {
      score += 1;
    }

    if (
      title.includes(
        token
      )
    ) {
      score += 3;
    }

    if (
      bookId.includes(
        token
      )
    ) {
      score += 2;
    }
  }


  /*
  ----------------------------------------------------------
  EXACT PHRASE BONUS
  ----------------------------------------------------------
  */

  const normalizedQuery =
    queryTokens.join(" ");

  if (
    normalizedQuery &&
    content.includes(
      normalizedQuery
    )
  ) {
    score += 8;
  }

  if (
    normalizedQuery &&
    title.includes(
      normalizedQuery
    )
  ) {
    score += 12;
  }


  return score;
}


/*
============================================================
RETRIEVE BOOK KNOWLEDGE
============================================================
*/

export function retrieveBookKnowledge(
  query,
  {
    limit = 5,
    bookId = null,
    status = null,
    authoritativeOnly = true,
  } = {}
) {
  /*
  ----------------------------------------------------------
  VALIDATE QUERY
  ----------------------------------------------------------
  */

  if (
    !query ||
    typeof query !==
      "string"
  ) {
    return {
      query: "",
      count: 0,
      knowledge: [],
    };
  }


  /*
  ----------------------------------------------------------
  LOAD CANONICAL INDEX
  ----------------------------------------------------------
  */

  const index =
    loadBookIndex();


  /*
  ----------------------------------------------------------
  QUERY TOKENS
  ----------------------------------------------------------
  */

  const queryTokens =
    meaningfulTokens(
      query
    );

  if (
    !queryTokens.length
  ) {
    return {
      query,
      count: 0,
      knowledge: [],
    };
  }


  /*
  ----------------------------------------------------------
  FLATTEN CANONICAL BOOK CHUNKS
  ----------------------------------------------------------
  */

  const candidates = [];


  for (
    const book of
      index.books || []
  ) {
    /*
    --------------------------------------------------------
    BOOK FILTER
    --------------------------------------------------------
    */

    if (
      !matchesBookFilters(
        book,
        {
          bookId,
          status,
          authoritativeOnly,
        }
      )
    ) {
      continue;
    }


    /*
    --------------------------------------------------------
    CHUNKS
    --------------------------------------------------------
    */

    for (
      const chunk of
        book.chunks || []
    ) {
      const score =
        scoreChunk(
          queryTokens,
          {
            ...chunk,

            authority:
              book.authority,

            status:
              book.status,
          }
        );


      if (
        score > 0
      ) {
        candidates.push({
          ...chunk,

          /*
          --------------------------------------------------
          BOOK METADATA
          --------------------------------------------------
          */

          bookId:
            chunk.bookId ||
            book.bookId,

          authority:
            book.authority,

          access:
            book.access,

          status:
            book.status,

          sourceFile:
            book.sourceFile,

          pages:
            book.pages,

          score,
        });
      }
    }
  }


  /*
  ----------------------------------------------------------
  SORT
  ----------------------------------------------------------
  */

  candidates.sort(
    (a, b) => {
      /*
      Higher score first
      */

      if (
        b.score !==
        a.score
      ) {
        return (
          b.score -
          a.score
        );
      }

      /*
      Stable fallback by book ID
      */

      const aBook =
        normalize(
          a.bookId
        );

      const bBook =
        normalize(
          b.bookId
        );

      if (
        aBook !==
        bBook
      ) {
        return aBook.localeCompare(
          bBook
        );
      }

      /*
      Stable fallback by chunk
      */

      return (
        Number(
          a.chunk || 0
        ) -
        Number(
          b.chunk || 0
        )
      );
    }
  );


  /*
  ----------------------------------------------------------
  RESULT LIMIT
  ----------------------------------------------------------
  */

  const safeLimit =
    Math.max(
      1,
      Number.isFinite(
        limit
      )
        ? limit
        : 5
    );


  /*
  ----------------------------------------------------------
  NORMALIZED KNOWLEDGE PAYLOAD
  ----------------------------------------------------------
  */

  const knowledge =
    candidates
      .slice(
        0,
        safeLimit
      )
      .map(
        (item) => ({
          id:
            item.id,

          bookId:
            item.bookId,

          title:
            item.title,

          chunk:
            item.chunk,

          content:
            item.content,

          authority:
            item.authority,

          status:
            item.status,

          source:
            item.sourceFile,

          pages:
            item.pages,

          access:
            item.access,

          score:
            item.score,
        })
      );


  /*
  ----------------------------------------------------------
  RETURN
  ----------------------------------------------------------
  */

  return {
    query,

    count:
      knowledge.length,

    knowledge,
  };
}


/*
============================================================
GET BOOK INDEX INFO
============================================================
*/

export function getBookIndexInfo() {
  const index =
    loadBookIndex();

  return {
    version:
      index.version,

    generatedAt:
      index.generatedAt,

    source:
      index.source,

    authority:
      index.authority,

    bookCount:
      index.statistics?.bookCount ??
      index.books?.length ??
      0,

    chunkCount:
      index.statistics?.chunkCount ??
      0,
  };
}


/*
============================================================
RELOAD BOOK INDEX
============================================================

Useful during development when the generated index
has been regenerated and the runtime needs to reload it.

============================================================
*/

export function reloadBookIndex() {
  cachedIndex = null;

  return loadBookIndex();
}