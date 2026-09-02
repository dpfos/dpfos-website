/*
============================================================
DPF OS — BOOK INGESTION
============================================================

Purpose:
Read the canonical private DPF books once and convert them
into a searchable local knowledge index.

IMPORTANT:
- Books are the source of truth.
- This runs during ingestion/indexing, NOT per AI request.
- Full PDF files remain private.
- No book content is duplicated into application logic.
- Runtime requests will later search the generated index.
============================================================
*/

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PDFParse } from "pdf-parse";

import { dpfBookManifest } from "./book-manifest.js";


/*
============================================================
PATHS
============================================================
*/

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const BOOKS_ROOT =
  path.resolve(
    __dirname,
    "../../private/books"
  );

const INDEX_ROOT =
  path.resolve(
    __dirname,
    "./index"
  );

const INDEX_FILE =
  path.join(
    INDEX_ROOT,
    "dpf-book-index.json"
  );


/*
============================================================
BOOK FILE DISCOVERY
============================================================
*/

async function findPdfFile(folder) {
  const folderPath =
    path.join(
      BOOKS_ROOT,
      folder
    );

  const entries =
    await fs.readdir(
      folderPath,
      {
        withFileTypes: true,
      }
    );

  const pdfs =
    entries
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name
            .toLowerCase()
            .endsWith(".pdf")
      )
      .map(
        (entry) =>
          path.join(
            folderPath,
            entry.name
          )
      );

  if (!pdfs.length) {
    throw new Error(
      `No PDF found for book folder: ${folder}`
    );
  }

  /*
  ----------------------------------------------------------
  CANONICAL RULE
  ----------------------------------------------------------

  One canonical PDF per book folder.

  If multiple PDFs exist, fail loudly instead of guessing.
  ----------------------------------------------------------
  */

  if (pdfs.length > 1) {
    throw new Error(
      `Multiple PDFs found for book folder "${folder}". ` +
      `Keep one canonical PDF only.`
    );
  }

  return pdfs[0];
}


/*
============================================================
TEXT NORMALIZATION
============================================================
*/

function normalizeText(text) {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}


/*
============================================================
CHUNKING
============================================================

We do NOT send the complete book to the model.

The extracted text is divided into searchable chunks.
*/

function createChunks(
  text,
  {
    maxCharacters = 3500,
    overlap = 400,
  } = {}
) {
  const paragraphs =
    text
      .split(/\n\s*\n/)
      .map(
        (paragraph) =>
          paragraph.trim()
      )
      .filter(Boolean);

  const chunks = [];

  let current = "";

  for (const paragraph of paragraphs) {
    const candidate =
      current
        ? `${current}\n\n${paragraph}`
        : paragraph;

    if (
      candidate.length <=
      maxCharacters
    ) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push(current);
    }

    /*
    --------------------------------------------------------
    OVERLAP
    --------------------------------------------------------
    */

    const tail =
      current.length > overlap
        ? current.slice(-overlap)
        : current;

    current =
      `${tail}\n\n${paragraph}`
        .trim();

    /*
    --------------------------------------------------------
    VERY LARGE PARAGRAPH
    --------------------------------------------------------
    */

    if (
      current.length >
      maxCharacters
    ) {
      for (
        let i = 0;
        i < current.length;
        i +=
          maxCharacters - overlap
      ) {
        const piece =
          current.slice(
            i,
            i + maxCharacters
          );

        if (piece.trim()) {
          chunks.push(
            piece.trim()
          );
        }
      }

      current = "";
    }
  }

  if (current.trim()) {
    chunks.push(
      current.trim()
    );
  }

  return chunks;
}


/*
============================================================
BOOK INGESTION
============================================================
*/

async function ingestBook(book) {
  console.log(
    `\n[BOOK] ${book.title}`
  );

  const pdfPath =
    await findPdfFile(
      book.folder
    );

  console.log(
    `[FILE] ${path.basename(pdfPath)}`
  );

  const buffer =
    await fs.readFile(
      pdfPath
    );

  console.log(
    `[SIZE] ${(buffer.length / 1024 / 1024).toFixed(2)} MB`
  );

  const parser =
    new PDFParse({
      data: buffer,
    });

  try {
    const result =
      await parser.getText();

    const text =
      normalizeText(
        result.text
      );

    const chunks =
      createChunks(
        text
      );

    console.log(
      `[PAGES] ${result.total ?? result.numpages ?? "unknown"}`
    );

    console.log(
      `[CHUNKS] ${chunks.length}`
    );

    return {
      bookId:
        book.id,

      title:
        book.title,

      authority:
        book.authority,

      access:
        book.access,

      sourceFile:
        path.basename(
          pdfPath
        ),

      pages:
        result.total ??
        result.numpages ??
        null,

      chunks:
        chunks.map(
          (
            content,
            index
          ) => ({
            id:
              `${book.id}:${index + 1}`,

            bookId:
              book.id,

            title:
              book.title,

            chunk:
              index + 1,

            content,
          })
        ),
    };

  } finally {
    await parser.destroy();
  }
}


/*
============================================================
BUILD INDEX
============================================================
*/

export async function buildBookIndex() {
  console.log(
    "\n============================================================"
  );

  console.log(
    "DPF OS — BUILDING CANONICAL BOOK INDEX"
  );

  console.log(
    "============================================================\n"
  );

  await fs.mkdir(
    INDEX_ROOT,
    {
      recursive: true,
    }
  );

  const books = [];

  for (
    const book
    of dpfBookManifest
  ) {
    const result =
      await ingestBook(
        book
      );

    books.push(
      result
    );
  }

  const totalChunks =
    books.reduce(
      (
        total,
        book
      ) =>
        total +
        book.chunks.length,
      0
    );

  const index = {
    version:
      "1.0.0",

    generatedAt:
      new Date().toISOString(),

    source:
      "DPF OS Canonical Books",

    authority:
      "canonical",

    books,

    statistics: {
      bookCount:
        books.length,

      chunkCount:
        totalChunks,
    },
  };

  await fs.writeFile(
    INDEX_FILE,
    JSON.stringify(
      index,
      null,
      2
    ),
    "utf8"
  );

  console.log(
    "\n============================================================"
  );

  console.log(
    "DPF OS — BOOK INDEX READY"
  );

  console.log(
    `Books: ${books.length}`
  );

  console.log(
    `Chunks: ${totalChunks}`
  );

  console.log(
    `Index: ${INDEX_FILE}`
  );

  console.log(
    "============================================================\n"
  );

  return index;
}


/*
============================================================
CLI
============================================================
*/

buildBookIndex()
  .catch(
    (error) => {
      console.error(
        "\nBOOK INGESTION FAILED:\n",
        error
      );

      process.exit(
        1
      );
    }
  );