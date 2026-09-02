/*
============================================================
DPF OS — KNOWLEDGE CONTEXT RESOLVER
============================================================
*/

import {
  retrieveBookKnowledge,
} from "../knowledge/book-retriever.js";


/*
============================================================
RESOLVE KNOWLEDGE CONTEXT
============================================================
*/

export function resolveKnowledgeContext(
  query,
  options = {}
) {
  if (
    !query ||
    typeof query !== "string"
  ) {
    throw new Error(
      "Knowledge query must be a non-empty string."
    );
  }

  const {
    limit = 5,
    bookId = null,
    status = null,
    authoritativeOnly = true,
  } = options;


  /*
  ----------------------------------------------------------
  CANONICAL BOOK RETRIEVAL
  ----------------------------------------------------------

  The DPF Books are the source of truth.

  Retrieval flows through the canonical generated
  DPF book index.

  No secondary knowledge registry is used.
  No PDF is read per request.
  ----------------------------------------------------------
  */

  return retrieveBookKnowledge(
    query,
    {
      limit,
      bookId,
      status,
      authoritativeOnly,
    }
  );
}