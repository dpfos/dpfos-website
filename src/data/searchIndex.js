/*
============================================================
DPF OS — MASTER SEARCH INDEX
============================================================

Purpose
------------------------------------------------------------
Unified discovery index for the DPF OS Knowledge System.

Search layers
------------------------------------------------------------
01. Books
02. Glossary

Future discovery layers will be connected only to their
canonical sources.

IMPORTANT
------------------------------------------------------------
This is a DISCOVERY layer.

It does NOT:
- expose protected book content
- open PDFs
- determine entitlement
- replace authentication
- replace the authoritative DPF books
- act as a secondary knowledge registry

The DPF books remain authoritative.

The search index provides searchable discovery metadata.
============================================================
*/

import books from "./books";
import searchGlossary from "./searchGlossary";


/*
============================================================
NORMALIZATION
============================================================
*/

export function normalizeText(value = "") {
  return value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}


/*
============================================================
TOKENIZATION
============================================================
*/

export function tokenize(value = "") {
  return normalizeText(value)
    .split(/\s+/)
    .filter(Boolean);
}


/*
============================================================
SLUG
============================================================
*/

function slugify(value = "") {
  return normalizeText(value)
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}


/*
============================================================
SAFE ARRAY
============================================================
*/

function safeArray(value) {
  return Array.isArray(value)
    ? value
    : [];
}


/*
============================================================
SAFE STRING
============================================================
*/

function safeString(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return value
    .toString()
    .trim();
}


/*
============================================================
BOOK SEARCH ITEM
============================================================
*/

function createBookSearchItem(book) {
  if (!book) {
    return null;
  }

  const title =
    safeString(book.title);

  const description =
    safeString(book.description);

  const searchableFields = [
    book.number,
    title,
    book.slug,
    book.category,
    book.status,
    book.version,
    description,
    book.subtitle,
    book.type,
    book.series,
    ...safeArray(book.aliases),
    ...safeArray(book.related),
  ].filter(Boolean);

  return {
    id:
      `book-${
        book.slug ||
        slugify(title)
      }`,

    type: "book",

    title,

    term: title,

    slug:
      book.slug ||
      slugify(title),

    number:
      book.number ||
      null,

    category:
      book.category ||
      "KNOWLEDGE",

    status:
      book.status ||
      "DISCOVERY",

    version:
      book.version ||
      null,

    description,

    subtitle:
      book.subtitle ||
      null,

    cover:
      book.cover ||
      null,

    route:
      book.route ||
      `/library/${
        book.slug ||
        slugify(title)
      }`,

    access:
      book.access ||
      "coming-soon",

    preview:
      book.preview ||
      "coming-soon",

    sourceType:
      "DPF_BOOK",

    authoritative:
      true,

    aliases:
      safeArray(book.aliases),

    related:
      safeArray(book.related),

    searchableText:
      normalizeText(
        searchableFields.join(" ")
      ),
  };
}


/*
============================================================
GLOSSARY SEARCH ITEM
============================================================
*/

function createGlossarySearchItem(item) {
  if (!item) {
    return null;
  }

  const term =
    safeString(item.term) ||
    safeString(item.title);

  const aliases =
    safeArray(item.aliases);

  const related =
    safeArray(item.related);

  const domain =
    safeString(item.domain) ||
    safeString(item.category);

  const description =
    safeString(item.description) ||
    safeString(item.definition);

  const searchableFields = [
    term,
    ...aliases,
    domain,
    ...related,
    description,
  ].filter(Boolean);

  return {
    id:
      item.id ||
      `glossary-${slugify(term)}`,

    type:
      "glossary",

    title:
      term,

    term,

    aliases,

    domain,

    category:
      domain,

    related,

    description,

    route:
      item.route ||
      `/search/glossary/${
        slugify(term)
      }`,

    sourceType:
      "DPF_GLOSSARY",

    authoritative:
      true,

    searchableText:
      normalizeText(
        searchableFields.join(" ")
      ),
  };
}


/*
============================================================
BASE INDICES
============================================================
*/

const bookIndex =
  safeArray(books)
    .map(
      createBookSearchItem
    )
    .filter(Boolean);


const glossaryIndex =
  safeArray(searchGlossary)
    .map(
      createGlossarySearchItem
    )
    .filter(Boolean);


/*
============================================================
MASTER SEARCH INDEX
============================================================

IMPORTANT
------------------------------------------------------------
There is intentionally NO:

- dpfMasterKnowledgeRegistry
- registryIndex
- secondary knowledge registry

Books and glossary are connected to their own canonical
discovery sources only.

The AI Runtime uses the separate canonical DPF Book Index
for authoritative book retrieval.
============================================================
*/

export const searchIndex = [
  ...bookIndex,
  ...glossaryIndex,
];


/*
============================================================
DUPLICATE CONTROL
============================================================
*/

function deduplicateItems(
  items = []
) {
  const seen =
    new Set();

  return items.filter(
    (item) => {
      if (!item) {
        return false;
      }

      const key =
        item.id ||
        `${
          item.type
        }-${
          slugify(
            item.title
          )
        }`;

      if (
        seen.has(key)
      ) {
        return false;
      }

      seen.add(key);

      return true;
    }
  );
}


/*
============================================================
FINAL INDEX
============================================================
*/

export const masterSearchIndex =
  deduplicateItems(
    searchIndex
  );


/*
============================================================
QUERY MATCH HELPERS
============================================================
*/

function exactMatch(
  value,
  query
) {
  return (
    normalizeText(value) ===
    normalizeText(query)
  );
}


function startsWithMatch(
  value,
  query
) {
  return normalizeText(
    value
  ).startsWith(
    normalizeText(query)
  );
}


function includesMatch(
  value,
  query
) {
  return normalizeText(
    value
  ).includes(
    normalizeText(query)
  );
}


/*
============================================================
TERM MATCH
============================================================
*/

function scoreTerm(
  value,
  query,
  weight
) {
  if (!value) {
    return 0;
  }

  const normalizedValue =
    normalizeText(value);

  const normalizedQuery =
    normalizeText(query);

  if (
    !normalizedValue ||
    !normalizedQuery
  ) {
    return 0;
  }

  if (
    normalizedValue ===
    normalizedQuery
  ) {
    return weight * 3;
  }

  if (
    normalizedValue.startsWith(
      normalizedQuery
    )
  ) {
    return weight * 2;
  }

  if (
    normalizedValue.includes(
      normalizedQuery
    )
  ) {
    return weight;
  }

  return 0;
}


/*
============================================================
TOKEN SCORE
============================================================
*/

function scoreTokens(
  searchableText,
  terms,
  weight
) {
  if (
    !searchableText ||
    !terms.length
  ) {
    return 0;
  }

  let score = 0;

  terms.forEach(
    (term) => {
      if (
        searchableText ===
        term
      ) {
        score +=
          weight * 2;

        return;
      }

      if (
        searchableText.startsWith(
          term
        )
      ) {
        score += weight;

        return;
      }

      if (
        searchableText.includes(
          ` ${term}`
        )
      ) {
        score += weight;

        return;
      }

      if (
        searchableText.includes(
          term
        )
      ) {
        score += Math.max(
          1,
          Math.floor(
            weight / 2
          )
        );
      }
    }
  );

  return score;
}


/*
============================================================
ITEM SCORING
============================================================
*/

export function scoreItem(
  item,
  query,
  terms = tokenize(query)
) {
  if (
    !item ||
    !query
  ) {
    return 0;
  }

  let score = 0;

  const normalizedQuery =
    normalizeText(query);


  /*
  ----------------------------------------------------------
  TITLE
  ----------------------------------------------------------
  */

  score += scoreTerm(
    item.title,
    normalizedQuery,
    100
  );


  /*
  ----------------------------------------------------------
  TERM
  ----------------------------------------------------------
  */

  score += scoreTerm(
    item.term,
    normalizedQuery,
    95
  );


  /*
  ----------------------------------------------------------
  ALIASES
  ----------------------------------------------------------
  */

  safeArray(
    item.aliases
  ).forEach(
    (alias) => {
      score += scoreTerm(
        alias,
        normalizedQuery,
        85
      );
    }
  );


  /*
  ----------------------------------------------------------
  CATEGORY
  ----------------------------------------------------------
  */

  score += scoreTerm(
    item.category,
    normalizedQuery,
    35
  );


  /*
  ----------------------------------------------------------
  DOMAIN
  ----------------------------------------------------------
  */

  score += scoreTerm(
    item.domain,
    normalizedQuery,
    35
  );


  /*
  ----------------------------------------------------------
  RELATED
  ----------------------------------------------------------
  */

  safeArray(
    item.related
  ).forEach(
    (related) => {
      score += scoreTerm(
        related,
        normalizedQuery,
        45
      );
    }
  );


  /*
  ----------------------------------------------------------
  DESCRIPTION
  ----------------------------------------------------------
  */

  score += scoreTokens(
    normalizeText(
      item.description
    ),
    terms,
    20
  );


  /*
  ----------------------------------------------------------
  SEARCHABLE TEXT
  ----------------------------------------------------------
  */

  score += scoreTokens(
    normalizeText(
      item.searchableText
    ),
    terms,
    10
  );


  /*
  ----------------------------------------------------------
  EXACT TITLE BOOST
  ----------------------------------------------------------
  */

  if (
    exactMatch(
      item.title,
      normalizedQuery
    )
  ) {
    score += 500;
  }


  /*
  ----------------------------------------------------------
  STARTING TITLE BOOST
  ----------------------------------------------------------
  */

  if (
    startsWithMatch(
      item.title,
      normalizedQuery
    )
  ) {
    score += 180;
  }


  /*
  ----------------------------------------------------------
  ALIAS EXACT BOOST
  ----------------------------------------------------------
  */

  const exactAlias =
    safeArray(
      item.aliases
    ).some(
      (alias) =>
        exactMatch(
          alias,
          normalizedQuery
        )
    );

  if (exactAlias) {
    score += 300;
  }


  /*
  ----------------------------------------------------------
  BOOK BOOST
  ----------------------------------------------------------
  */

  if (
    item.type ===
    "book"
  ) {
    score += 15;
  }


  /*
  ----------------------------------------------------------
  AUTHORITATIVE BOOST
  ----------------------------------------------------------
  */

  if (
    item.authoritative ===
    true
  ) {
    score += 8;
  }


  return score;
}


/*
============================================================
SEARCH
============================================================
*/

export function searchUnified(
  query = "",
  options = {}
) {
  const normalizedQuery =
    normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  const terms =
    tokenize(
      normalizedQuery
    );

  if (!terms.length) {
    return [];
  }

  const limit =
    Number.isFinite(
      options.limit
    )
      ? options.limit
      : 50;

  const type =
    options.type ||
    null;

  const category =
    options.category ||
    null;


  /*
  ----------------------------------------------------------
  SCORE
  ----------------------------------------------------------
  */

  const results =
    masterSearchIndex

      .filter(
        (item) => {
          if (
            type &&
            item.type !==
              type
          ) {
            return false;
          }

          if (
            category &&
            normalizeText(
              item.category
            ) !==
              normalizeText(
                category
              )
          ) {
            return false;
          }

          return true;
        }
      )

      .map(
        (item) => {
          const score =
            scoreItem(
              item,
              normalizedQuery,
              terms
            );

          return {
            ...item,
            score,
          };
        }
      )

      .filter(
        (item) =>
          item.score > 0
      );


  /*
  ----------------------------------------------------------
  SORT
  ----------------------------------------------------------
  */

  results.sort(
    (a, b) => {
      if (
        b.score !==
        a.score
      ) {
        return (
          b.score -
          a.score
        );
      }

      const aTitle =
        normalizeText(
          a.title ||
          a.term
        );

      const bTitle =
        normalizeText(
          b.title ||
          b.term
        );

      return aTitle.localeCompare(
        bTitle
      );
    }
  );


  /*
  ----------------------------------------------------------
  LIMIT
  ----------------------------------------------------------
  */

  return results.slice(
    0,
    Math.max(
      1,
      limit
    )
  );
}


/*
============================================================
SEARCH BOOKS
============================================================
*/

export function searchBooks(
  query = "",
  options = {}
) {
  return searchUnified(
    query,
    {
      ...options,
      type: "book",
    }
  );
}


/*
============================================================
SEARCH GLOSSARY
============================================================
*/

export function searchGlossaryItems(
  query = "",
  options = {}
) {
  return searchUnified(
    query,
    {
      ...options,
      type: "glossary",
    }
  );
}


/*
============================================================
SEARCH METHODS
============================================================
*/

export function searchMethods(
  query = "",
  options = {}
) {
  return searchUnified(
    query,
    {
      ...options,
      type: "method",
    }
  );
}


/*
============================================================
SEARCH TOOLS
============================================================
*/

export function searchTools(
  query = "",
  options = {}
) {
  return searchUnified(
    query,
    {
      ...options,
      type: "tool",
    }
  );
}


/*
============================================================
SEARCH PERFORMANCE
============================================================
*/

export function searchPerformance(
  query = "",
  options = {}
) {
  return searchUnified(
    query,
    {
      ...options,
      type: "performance",
    }
  );
}


/*
============================================================
SEARCH TECHNOLOGY
============================================================
*/

export function searchTechnology(
  query = "",
  options = {}
) {
  return searchUnified(
    query,
    {
      ...options,
      type: "technology",
    }
  );
}


/*
============================================================
SEARCH RESEARCH
============================================================
*/

export function searchResearch(
  query = "",
  options = {}
) {
  return searchUnified(
    query,
    {
      ...options,
      type: "research",
    }
  );
}


/*
============================================================
SEARCH AI
============================================================
*/

export function searchAI(
  query = "",
  options = {}
) {
  return searchUnified(
    query,
    {
      ...options,
      type: "ai",
    }
  );
}


/*
============================================================
SEARCH ALL
============================================================
*/

export function searchAll(
  query = "",
  options = {}
) {
  return searchUnified(
    query,
    options
  );
}


/*
============================================================
FIND BOOK
============================================================
*/

export function findBook(
  query = ""
) {
  return (
    searchBooks(
      query,
      {
        limit: 1,
      }
    )[0] ||
    null
  );
}


/*
============================================================
FIND CONCEPT
============================================================
*/

export function findConcept(
  query = ""
) {
  return (
    searchGlossaryItems(
      query,
      {
        limit: 1,
      }
    )[0] ||
    null
  );
}


/*
============================================================
FIND KNOWLEDGE OBJECT
============================================================
*/

export function findKnowledgeObject(
  query = ""
) {
  return (
    searchAll(
      query,
      {
        limit: 1,
      }
    )[0] ||
    null
  );
}


/*
============================================================
GET BY TYPE
============================================================
*/

export function getSearchByType(
  type
) {
  if (!type) {
    return [];
  }

  return masterSearchIndex.filter(
    (item) =>
      item.type === type
  );
}


/*
============================================================
GET BY CATEGORY
============================================================
*/

export function getSearchByCategory(
  category
) {
  if (!category) {
    return [];
  }

  const normalized =
    normalizeText(
      category
    );

  return masterSearchIndex.filter(
    (item) =>
      normalizeText(
        item.category
      ) === normalized
  );
}


/*
============================================================
GET RELATED OBJECTS
============================================================
*/

export function getRelatedObjects(
  item
) {
  if (!item) {
    return [];
  }

  const related =
    safeArray(
      item.related
    )
      .map(
        (value) =>
          normalizeText(
            value
          )
      )
      .filter(Boolean);

  if (!related.length) {
    return [];
  }

  return masterSearchIndex
    .filter(
      (candidate) => {
        const candidateTitle =
          normalizeText(
            candidate.title
          );

        const candidateTerm =
          normalizeText(
            candidate.term
          );

        return related.some(
          (relation) =>
            candidateTitle ===
              relation ||
            candidateTerm ===
              relation ||
            candidateTitle.includes(
              relation
            ) ||
            candidateTerm.includes(
              relation
            )
        );
      }
    )
    .slice(
      0,
      12
    );
}


/*
============================================================
SEARCH SUGGESTIONS
============================================================
*/

export function getSearchSuggestions(
  query = "",
  limit = 8
) {
  const normalized =
    normalizeText(query);

  if (!normalized) {
    return [];
  }

  return masterSearchIndex

    .filter(
      (item) => {
        return (
          includesMatch(
            item.title,
            normalized
          ) ||
          safeArray(
            item.aliases
          ).some(
            (alias) =>
              includesMatch(
                alias,
                normalized
              )
          )
        );
      }
    )

    .sort(
      (a, b) => {
        const aExact =
          exactMatch(
            a.title,
            normalized
          );

        const bExact =
          exactMatch(
            b.title,
            normalized
          );

        if (
          aExact &&
          !bExact
        ) {
          return -1;
        }

        if (
          !aExact &&
          bExact
        ) {
          return 1;
        }

        return a.title.localeCompare(
          b.title
        );
      }
    )

    .slice(
      0,
      limit
    )

    .map(
      (item) => ({
        id:
          item.id,

        title:
          item.title,

        type:
          item.type,

        category:
          item.category,

        route:
          item.route,
      })
    );
}


/*
============================================================
SEARCH STATS
============================================================
*/

export function getSearchStats() {
  const byType = {};

  const byCategory = {};

  masterSearchIndex.forEach(
    (item) => {
      const type =
        item.type ||
        "unknown";

      const category =
        item.category ||
        "unknown";

      byType[type] =
        (byType[type] || 0) +
        1;

      byCategory[category] =
        (byCategory[category] || 0) +
        1;
    }
  );

  return {
    total:
      masterSearchIndex.length,

    books:
      bookIndex.length,

    glossary:
      glossaryIndex.length,

    byType,

    byCategory,
  };
}


/*
============================================================
SEARCH HEALTH CHECK
============================================================
*/

export function getSearchHealth() {
  const stats =
    getSearchStats();

  const requiredTypes = [
    "book",
    "glossary",
    "method",
    "tool",
    "performance",
    "technology",
    "research",
    "ai",
  ];

  const missingTypes =
    requiredTypes.filter(
      (type) =>
        !stats.byType[type]
    );

  return {
    healthy:
      missingTypes.length === 0,

    total:
      stats.total,

    missingTypes,

    stats,
  };
}


/*
============================================================
DEFAULT EXPORT
============================================================
*/

export default masterSearchIndex;