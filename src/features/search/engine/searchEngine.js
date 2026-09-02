/* =========================================================
   DPF OS — SEARCH ENGINE
   =========================================================

   Architecture:

   SEARCH INDEX
        ↓
   QUERY ANALYSIS
        ↓
   QUERY NORMALIZATION
        ↓
   RELEVANCE SCORING
        ↓
   REAL MATCH FILTER
        ↓
   ACCESS CLASSIFICATION
        ↓
   RANKED RESULTS

   IMPORTANT:

   - Search discovers knowledge.
   - Entitlement Engine decides access.
   - Search NEVER exposes protected book content.
   - Search NEVER determines entitlement.
   - The DPF Knowledge Registry / Search Index remain
     discovery sources.
   ========================================================= */


/* =========================================================
   IMPORTS
   ========================================================= */

import { searchIndex } from "../../../data/searchIndex";

import {
  createAccessContext,
  classifyResult,
} from "../../../data/entitlements/entitlementEngine";


/* =========================================================
   SEARCH ACCESS MODES
   ========================================================= */

export const SEARCH_ACCESS = {
  PUBLIC: "public",
  PREMIUM: "premium",
  PRO: "pro",
  CLUB: "club",
};


/* =========================================================
   SEARCH CONFIG
   ========================================================= */

export const SEARCH_CONFIG = {

  /*
   Maximum number of returned results.
   */
  MAX_RESULTS: 50,

  /*
   Minimum score required for a result.

   We intentionally keep this above zero because
   weak metadata matches should not become results.
   */
  MIN_SCORE: 25,

  /*
   Maximum query length.
   */
  MAX_QUERY_LENGTH: 200,

  /*
   Minimum token coverage required for a
   multi-token query to be considered meaningful.
   */
  MIN_MULTI_TOKEN_COVERAGE: 0.66,

  /*
   Very short generic tokens are dangerous.
   Examples:

   run
   man
   play
   ball
   etc.

   Exact phrase/title matches still win.
   */
  GENERIC_TOKEN_MAX_LENGTH: 3,
};


/* =========================================================
   NORMALIZATION
   ========================================================= */

/**
 * Converts any searchable value into a safe
 * normalized string.
 *
 * Handles:
 *
 * - uppercase / lowercase
 * - punctuation
 * - repeated spaces
 * - hyphens
 * - accents
 * - common football shorthand
 */
export function normalize(value = "") {

  return String(value)
    .toLowerCase()
    .trim()

    /*
     * Common football shorthand normalization.
     */
    .replace(/\b3rd\b/gu, "third")
    .replace(/\b2nd\b/gu, "second")
    .replace(/\b1st\b/gu, "first")
    .replace(/\bu-?18\b/gu, "u18")
    .replace(/\bu-?17\b/gu, "u17")
    .replace(/\bu-?16\b/gu, "u16")
    .replace(/\bu-?15\b/gu, "u15")

    /*
     * Remove punctuation while preserving letters,
     * numbers, spaces and hyphens.
     */
    .replace(
      /[^\p{L}\p{N}\s-]/gu,
      " "
    )

    /*
     * Normalize hyphen spacing.
     */
    .replace(
      /\s*-\s*/gu,
      "-"
    )

    /*
     * Collapse whitespace.
     */
    .replace(
      /\s+/g,
      " "
    )

    .trim();
}


/* =========================================================
   TOKENIZATION
   ========================================================= */

export function tokenize(value = "") {

  return normalize(value)
    .split(/\s+/)
    .map(
      (token) =>
        token.trim()
    )
    .filter(Boolean);
}


/* =========================================================
   QUERY ANALYSIS
   ========================================================= */

/**
 * Analyze the user's query.
 *
 * Example:
 *
 * "I need exercises for 3rd man run"
 *
 * becomes:
 *
 * {
 *   rawQuery,
 *   normalizedQuery,
 *   tokens,
 *   tokenCount,
 *   isEmpty
 * }
 */
export function analyzeQuery(
  query = ""
) {

  const rawQuery =
    String(query);


  const normalizedQuery =
    normalize(
      rawQuery.slice(
        0,
        SEARCH_CONFIG.MAX_QUERY_LENGTH
      )
    );


  const tokens =
    tokenize(
      normalizedQuery
    );


  return {

    rawQuery,

    normalizedQuery,

    tokens,

    tokenCount:
      tokens.length,

    isEmpty:
      tokens.length === 0,

  };
}


/* =========================================================
   FIELD HELPERS
   ========================================================= */

function normalizeArray(value) {

  if (
    !Array.isArray(value)
  ) {
    return [];
  }


  return value

    .map(
      (item) =>
        normalize(item)
    )

    .filter(Boolean);
}


function getTitle(item) {

  return normalize(
    item?.title ||
    item?.name ||
    ""
  );
}


function getDescription(item) {

  return normalize(
    item?.description ||
    item?.definition ||
    ""
  );
}


function getTerm(item) {

  return normalize(
    item?.term ||
    ""
  );
}


function getAliases(item) {

  return normalizeArray(
    item?.aliases
  );
}


function getKeywords(item) {

  return normalizeArray(
    item?.keywords
  );
}


function getTags(item) {

  return normalizeArray(
    item?.tags
  );
}


function getCategory(item) {

  return normalize(
    item?.category ||
    ""
  );
}


function getDomain(item) {

  return normalize(
    item?.domain ||
    ""
  );
}


function getType(item) {

  return normalize(
    item?.type ||
    ""
  );
}


/* =========================================================
   SEARCHABLE TEXT
   ========================================================= */

/**
 * Creates the complete searchable surface.
 *
 * Discovery metadata only.
 *
 * NEVER include protected book content here.
 */
export function getSearchableText(item) {

  return [

    item?.id,
    item?.slug,

    item?.title,
    item?.name,
    item?.term,

    item?.description,
    item?.definition,

    item?.category,
    item?.domain,
    item?.type,
    item?.version,

    ...normalizeArray(
      item?.aliases
    ),

    ...normalizeArray(
      item?.keywords
    ),

    ...normalizeArray(
      item?.tags
    ),

    ...normalizeArray(
      item?.related
    ),

  ]

    .map(
      normalize
    )

    .filter(Boolean)

    .join(" ");
}


/* =========================================================
   TYPE BOOSTS
   ========================================================= */

const TYPE_BOOSTS = {

  book: 50,

  system: 45,

  framework: 45,

  concept: 40,

  method: 40,

  tool: 35,

  skill: 35,

  performance: 35,

  technology: 35,

  research: 35,

  ai: 35,

  knowledge: 30,

  glossary: 30,

  equipment: 25,

  measurement: 25,

};


/* =========================================================
   ACCESS NORMALIZATION
   ========================================================= */

/**
 * Backwards-compatible access handling.
 *
 * Accepts:
 *
 * "public"
 *
 * OR:
 *
 * {
 *   userTier: "premium"
 * }
 *
 * OR a real entitlement context.
 */
function resolveAccessContext(
  access
) {

  if (
    access &&
    typeof access === "object" &&
    access.matrix
  ) {
    return access;
  }


  const tier =
    typeof access === "string"
      ? access
      : access?.userTier ||
        "standard";


  return createAccessContext({
    userTier: tier,
  });
}


/* =========================================================
   QUERY MATCH HELPERS
   ========================================================= */

function exactMatch(
  value,
  normalizedQuery
) {

  return (
    Boolean(value) &&
    normalize(value) ===
      normalize(normalizedQuery)
  );
}


/* =========================================================
   WHOLE WORD MATCH
   ========================================================= */

/**
 * IMPORTANT:
 *
 * This is the main fix for the previous
 * overmatching problem.
 *
 * Old behavior:
 *
 * run → running
 * man → management
 *
 * New behavior:
 *
 * run → run       YES
 * run → running   NO
 * man → man       YES
 * man → management NO
 */

/* =========================================================
   WHOLE WORD / TOKEN MATCH
   ========================================================= */

/**
 * Matches a token as a real word.
 *
 * Important:
 *
 * "third-man"
 *
 * must match:
 *
 * "third"
 * "man"
 *
 * But:
 *
 * "run"
 *
 * must NOT match:
 *
 * "running"
 *
 * "man"
 *
 * must NOT match:
 *
 * "management"
 *
 * Hyphens are treated as word boundaries.
 */
function tokenMatch(
  value,
  token
) {
  if (
    !value ||
    !token
  ) {
    return false;
  }

  const normalizedValue =
    normalize(value);

  const normalizedToken =
    normalize(token);

  if (
    !normalizedValue ||
    !normalizedToken
  ) {
    return false;
  }

  /*
   * Escape regex characters.
   */
  const escapedToken =
    normalizedToken.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  /*
   * Word boundaries:
   *
   * - beginning / end
   * - whitespace
   * - hyphen
   *
   * This means:
   *
   * third-man
   *
   * matches:
   *
   * third
   * man
   */
  const pattern =
    new RegExp(
      `(?:^|[\\s-])${escapedToken}(?=$|[\\s-])`,
      "u"
    );

  return pattern.test(
    normalizedValue
  );
}


/* =========================================================
   PHRASE MATCH
   ========================================================= */

function phraseMatch(
  value,
  normalizedQuery
) {

  if (
    !value ||
    !normalizedQuery
  ) {
    return false;
  }


  return normalize(
    value
  ).includes(
    normalize(
      normalizedQuery
    )
  );
}


/* =========================================================
   FIELD TOKEN MATCH
   ========================================================= */

function fieldContainsToken(
  values,
  token
) {

  return values.some(
    (value) =>
      tokenMatch(
        value,
        token
      )
  );
}


/* =========================================================
   GENERIC TOKEN DETECTION
   ========================================================= */

function isGenericToken(
  token
) {

  if (!token) {
    return true;
  }


  const genericTokens = new Set([
    "the",
    "a",
    "an",
    "for",
    "to",
    "of",
    "in",
    "on",
    "with",
    "and",
    "or",
    "need",
    "want",
    "show",
    "give",
    "get",
    "how",
    "what",
    "why",
    "exercise",
    "exercises",
    "training",
    "session",
  ]);


  return (
    genericTokens.has(
      token
    ) ||
    token.length <=
      SEARCH_CONFIG.GENERIC_TOKEN_MAX_LENGTH
  );
}


/* =========================================================
   QUERY FIELD MATCH
   ========================================================= */

function getFieldTokenCount(
  values,
  tokens
) {

  if (
    !tokens.length
  ) {
    return 0;
  }


  return tokens.filter(
    (token) =>
      fieldContainsToken(
        values,
        token
      )
  ).length;
}


/* =========================================================
   SCORE ITEM
   ========================================================= */

/**
 * Returns:
 *
 * {
 *   score,
 *   matched,
 *   matchedFields
 * }
 */
export function scoreItem(
  item,
  analysis
) {

  const {
    normalizedQuery,
    tokens,
  } = analysis;


  if (
    !item ||
    !normalizedQuery
  ) {

    return {

      score: 0,

      matched: false,

      matchedFields: [],

    };
  }


  /* -------------------------------------------------------
     NORMALIZED FIELDS
     ------------------------------------------------------- */

  const title =
    getTitle(item);


  const term =
    getTerm(item);


  const description =
    getDescription(item);


  const aliases =
    getAliases(item);


  const keywords =
    getKeywords(item);


  const tags =
    getTags(item);


  const category =
    getCategory(item);


  const domain =
    getDomain(item);


  const type =
    getType(item);


  const searchableText =
    getSearchableText(item);


  /* -------------------------------------------------------
     SCORE STATE
     ------------------------------------------------------- */

  let score = 0;

  let matched = false;

  const matchedFields =
    new Set();


  /* =======================================================
     EXACT TITLE
     ======================================================= */

  if (
    exactMatch(
      title,
      normalizedQuery
    )
  ) {

    score += 1200;

    matched = true;

    matchedFields.add(
      "title-exact"
    );
  }


  /* =======================================================
     EXACT TERM
     ======================================================= */

  if (
    exactMatch(
      term,
      normalizedQuery
    )
  ) {

    score += 1150;

    matched = true;

    matchedFields.add(
      "term-exact"
    );
  }


  /* =======================================================
     EXACT ALIAS
     ======================================================= */

  if (
    aliases.some(
      (alias) =>
        exactMatch(
          alias,
          normalizedQuery
        )
    )
  ) {

    score += 1000;

    matched = true;

    matchedFields.add(
      "alias-exact"
    );
  }


  /* =======================================================
     EXACT KEYWORD
     ======================================================= */

  if (
    keywords.some(
      (keyword) =>
        exactMatch(
          keyword,
          normalizedQuery
        )
    )
  ) {

    score += 850;

    matched = true;

    matchedFields.add(
      "keyword-exact"
    );
  }


  /* =======================================================
     TITLE PHRASE
     ======================================================= */

  if (
    phraseMatch(
      title,
      normalizedQuery
    )
  ) {

    score += 500;

    matched = true;

    matchedFields.add(
      "title"
    );
  }


  /* =======================================================
     TERM PHRASE
     ======================================================= */

  if (
    phraseMatch(
      term,
      normalizedQuery
    )
  ) {

    score += 450;

    matched = true;

    matchedFields.add(
      "term"
    );
  }


  /* =======================================================
     ALIAS PHRASE
     ======================================================= */

  if (
    aliases.some(
      (alias) =>
        phraseMatch(
          alias,
          normalizedQuery
        )
    )
  ) {

    score += 300;

    matched = true;

    matchedFields.add(
      "alias"
    );
  }


  /* =======================================================
     KEYWORD PHRASE
     ======================================================= */

  if (
    keywords.some(
      (keyword) =>
        phraseMatch(
          keyword,
          normalizedQuery
        )
    )
  ) {

    score += 275;

    matched = true;

    matchedFields.add(
      "keyword"
    );
  }


  /* =======================================================
     MULTI TOKEN MATCHING
     ======================================================= */

  if (
    tokens.length > 1
  ) {

    const titleCount =
      getFieldTokenCount(
        [title],
        tokens
      );


    const termCount =
      getFieldTokenCount(
        [term],
        tokens
      );


    const aliasCount =
      getFieldTokenCount(
        aliases,
        tokens
      );


    const keywordCount =
      getFieldTokenCount(
        keywords,
        tokens
      );


    const tagCount =
      getFieldTokenCount(
        tags,
        tokens
      );


    const searchableCount =
      getFieldTokenCount(
        [searchableText],
        tokens
      );


    const matchedTokenCount =
      Math.max(
        titleCount,
        termCount,
        aliasCount,
        keywordCount,
        tagCount,
        searchableCount
      );


    const tokenCoverage =
      matchedTokenCount /
      tokens.length;


    /* -----------------------------------------------------
       FULL TOKEN COVERAGE
       ----------------------------------------------------- */

    if (
      matchedTokenCount ===
      tokens.length
    ) {

      score += 150;

      matched = true;

      matchedFields.add(
        "all-tokens"
      );
    }


    /* -----------------------------------------------------
       STRONG PARTIAL COVERAGE
       ----------------------------------------------------- */

    else if (
      tokenCoverage >=
        SEARCH_CONFIG.MIN_MULTI_TOKEN_COVERAGE &&
      matchedTokenCount >= 2
    ) {

      score += 60;

      matched = true;

      matchedFields.add(
        "partial-tokens"
      );
    }


    /* -----------------------------------------------------
       WEAK SINGLE TOKEN
       ----------------------------------------------------- */

    else if (
      matchedTokenCount === 1
    ) {

      /*
       * Do NOT allow one weak token to turn
       * a multi-token query into a valid result.
       */
      score -= 40;

      matchedFields.add(
        "weak-token"
      );
    }
  }


  /* =======================================================
     SINGLE TOKEN FIELD MATCHING
     ======================================================= */

  if (
    tokens.length === 1
  ) {

    const token =
      tokens[0];


    /* -----------------------------------------------------
       TITLE TOKEN
       ----------------------------------------------------- */

    if (
      tokenMatch(
        title,
        token
      )
    ) {

      score += 120;

      matched = true;

      matchedFields.add(
        "title-token"
      );
    }


    /* -----------------------------------------------------
       TERM TOKEN
       ----------------------------------------------------- */

    if (
      tokenMatch(
        term,
        token
      )
    ) {

      score += 110;

      matched = true;

      matchedFields.add(
        "term-token"
      );
    }


    /* -----------------------------------------------------
       ALIAS TOKEN
       ----------------------------------------------------- */

    if (
      fieldContainsToken(
        aliases,
        token
      )
    ) {

      score += 90;

      matched = true;

      matchedFields.add(
        "alias-token"
      );
    }


    /* -----------------------------------------------------
       KEYWORD TOKEN
       ----------------------------------------------------- */

    if (
      fieldContainsToken(
        keywords,
        token
      )
    ) {

      score += 80;

      matched = true;

      matchedFields.add(
        "keyword-token"
      );
    }


    /* -----------------------------------------------------
       TAG TOKEN
       ----------------------------------------------------- */

    if (
      fieldContainsToken(
        tags,
        token
      )
    ) {

      score += 45;

      matched = true;

      matchedFields.add(
        "tag-token"
      );
    }


    /* -----------------------------------------------------
       CATEGORY
       ----------------------------------------------------- */

    if (
      tokenMatch(
        category,
        token
      )
    ) {

      score += 35;

      matched = true;

      matchedFields.add(
        "category"
      );
    }


    /* -----------------------------------------------------
       DOMAIN
       ----------------------------------------------------- */

    if (
      tokenMatch(
        domain,
        token
      )
    ) {

      score += 35;

      matched = true;

      matchedFields.add(
        "domain"
      );
    }


    /* -----------------------------------------------------
       TYPE
       ----------------------------------------------------- */

    if (
      tokenMatch(
        type,
        token
      )
    ) {

      score += 25;

      matched = true;

      matchedFields.add(
        "type"
      );
    }


    /* -----------------------------------------------------
       DESCRIPTION
       ----------------------------------------------------- */

    if (
      tokenMatch(
        description,
        token
      )
    ) {

      /*
       * Description-only matches are intentionally
       * weak and should not dominate discovery.
       */
      score += 12;

      matched = true;

      matchedFields.add(
        "description"
      );
    }
  }


  /* =======================================================
     MULTI TOKEN SEARCHABLE SURFACE
     ======================================================= */

  if (
    tokens.length > 1
  ) {

    const matchedTokenCount =
      tokens.filter(
        (token) =>
          tokenMatch(
            searchableText,
            token
          )
      ).length;


    /*
     * Only add a metadata contribution when
     * the query has meaningful token coverage.
     */
    if (
      matchedTokenCount ===
      tokens.length
    ) {

      score += 20;

      matched = true;

      matchedFields.add(
        "metadata"
      );
    }
  }


  /* =======================================================
     QUERY PHRASE IN SEARCHABLE SURFACE
     ======================================================= */

  if (
    tokens.length > 1 &&
    phraseMatch(
      searchableText,
      normalizedQuery
    )
  ) {

    score += 220;

    matched = true;

    matchedFields.add(
      "phrase"
    );
  }


  /* =======================================================
     GENERIC TOKEN PENALTY
     ======================================================= */

  if (
    tokens.length > 1
  ) {

    const meaningfulTokens =
      tokens.filter(
        (token) =>
          !isGenericToken(
            token
          )
      );


    /*
     * If there are meaningful query terms,
     * reward results that actually match them.
     */
    if (
      meaningfulTokens.length
    ) {

      const meaningfulMatched =
        meaningfulTokens.filter(
          (token) =>
            tokenMatch(
              searchableText,
              token
            )
        ).length;


      if (
        meaningfulMatched === 0
      ) {

        score -= 150;

        matchedFields.add(
          "no-meaningful-token"
        );
      }
    }
  }


  /* =======================================================
     QUALITY BOOSTS
     ======================================================= */

  /*
   * IMPORTANT:
   *
   * Quality boosts happen ONLY after
   * a genuine query match.
   */
  if (
    matched
  ) {

    score +=
      TYPE_BOOSTS[
        item?.type
      ] || 0;


    if (
      item?.title
    ) {

      score += 5;
    }


    if (
      item?.description ||
      item?.definition
    ) {

      score += 5;
    }
  }


  /* =======================================================
     FINAL MATCH SAFETY
     ======================================================= */

  /*
   * Multi-token queries must have meaningful coverage.
   *
   * This is the second major protection against
   * "3rd man run" returning random "run" results.
   */
  if (
    tokens.length > 1
  ) {

    const matchedCount =
      tokens.filter(
        (token) =>
          tokenMatch(
            searchableText,
            token
          )
      ).length;


    const coverage =
      matchedCount /
      tokens.length;


    const hasStrongPhrase =
      phraseMatch(
        title,
        normalizedQuery
      ) ||
      phraseMatch(
        term,
        normalizedQuery
      ) ||
      aliases.some(
        (alias) =>
          phraseMatch(
            alias,
            normalizedQuery
          )
      ) ||
      keywords.some(
        (keyword) =>
          phraseMatch(
            keyword,
            normalizedQuery
          )
      );


    /*
     * Full phrase always qualifies.
     *
     * Otherwise require meaningful token coverage.
     */
    if (
      !hasStrongPhrase &&
      coverage <
        SEARCH_CONFIG.MIN_MULTI_TOKEN_COVERAGE
    ) {

      matched = false;

      score = 0;

      matchedFields.add(
        "rejected-low-coverage"
      );
    }
  }


  /* =======================================================
     MINIMUM SCORE SAFETY
     * ======================================================= */

  if (
    score <
    SEARCH_CONFIG.MIN_SCORE
  ) {

    matched = false;
  }


  /* =======================================================
     RETURN
     * ======================================================= */

  return {

    score,

    matched,

    matchedFields: [
      ...matchedFields,
    ],

  };
}


/* =========================================================
   ACCESS CLASSIFICATION
   ========================================================= */

function classifySearchResult(
  item,
  context
) {

  const classification =
    classifyResult(
      context,
      item
    );


  return {

    ...classification,

    /*
     * Preserve original search access
     * for UI badges / presentation.
     */
    searchAccess:
      item?.access ||
      "public",

  };
}


/* =========================================================
   BUILD RESULT
   ========================================================= */

function buildResult(
  item,
  scoreData,
  context
) {

  const classification =
    classifySearchResult(
      item,
      context
    );


  return {

    ...item,

    score:
      scoreData.score,

    matched:
      scoreData.matched,

    matchedFields:
      scoreData.matchedFields,

    classification,

    /*
     * Convenient UI fields.
     */
    accessState:
      classification.state,

    accessible:
      classification.accessible,

    accessLevel:
      classification.accessLevel ||
      item?.access ||
      "public",

    upgradeTo:
      classification.upgradeTo ||
      null,

    productId:
      classification.productId ||
      item?.productId ||
      null,

  };
}


/* =========================================================
   SEARCH
   ========================================================= */

/**
 * Main Search API.
 *
 * Examples:
 *
 * search(
 *   "game model",
 *   "premium"
 * )
 *
 * search(
 *   "3rd man run",
 *   SEARCH_ACCESS.PUBLIC
 * )
 */
export function search(
  query,
  access =
    SEARCH_ACCESS.PUBLIC
) {

  /* -------------------------------------------------------
     QUERY ANALYSIS
     ------------------------------------------------------- */

  const analysis =
    analyzeQuery(
      query
    );


  if (
    analysis.isEmpty
  ) {

    return [];
  }


  /* -------------------------------------------------------
     ACCESS CONTEXT
     ------------------------------------------------------- */

  const context =
    resolveAccessContext(
      access
    );


  /* -------------------------------------------------------
     SEARCH INDEX SAFETY
     ------------------------------------------------------- */

  if (
    !Array.isArray(
      searchIndex
    )
  ) {

    return [];
  }


  /* -------------------------------------------------------
     SCORE
     ------------------------------------------------------- */

  const rankedResults =
    searchIndex

      .map(
        (item) => {

          const scoreData =
            scoreItem(
              item,
              analysis
            );


          return {

            item,

            scoreData,

          };
        }
      )


      /* -----------------------------------------------------
         REAL MATCH FILTER
         ----------------------------------------------------- */

      .filter(
        ({
          scoreData,
        }) =>
          scoreData.matched ===
            true &&
          scoreData.score >=
            SEARCH_CONFIG.MIN_SCORE
      )


      /* -----------------------------------------------------
         BUILD CLASSIFIED RESULTS
         ----------------------------------------------------- */

      .map(
        ({
          item,
          scoreData,
        }) =>
          buildResult(
            item,
            scoreData,
            context
          )
      )


      /* -----------------------------------------------------
         SORT
         ----------------------------------------------------- */

      .sort(
        (a, b) => {

          /*
           * PRIMARY:
           *
           * Relevance score.
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
           * SECONDARY:
           *
           * Exact title.
           */
          const aExactTitle =
            a.matchedFields?.includes(
              "title-exact"
            )
              ? 1
              : 0;


          const bExactTitle =
            b.matchedFields?.includes(
              "title-exact"
            )
              ? 1
              : 0;


          if (
            bExactTitle !==
            aExactTitle
          ) {

            return (
              bExactTitle -
              aExactTitle
            );
          }


          /*
           * TERTIARY:
           *
           * Exact term.
           */
          const aExactTerm =
            a.matchedFields?.includes(
              "term-exact"
            )
              ? 1
              : 0;


          const bExactTerm =
            b.matchedFields?.includes(
              "term-exact"
            )
              ? 1
              : 0;


          if (
            bExactTerm !==
            aExactTerm
          ) {

            return (
              bExactTerm -
              aExactTerm
            );
          }


          /*
           * FINAL:
           *
           * Stable alphabetical fallback.
           */
          return String(
            a.title || ""
          ).localeCompare(
            String(
              b.title || ""
            )
          );
        }
      );


  /* -------------------------------------------------------
     LIMIT
     ------------------------------------------------------- */

  return rankedResults.slice(
    0,
    SEARCH_CONFIG.MAX_RESULTS
  );
}


/* =========================================================
   SEARCH STATISTICS
   ========================================================= */

/**
 * Useful for debugging the engine.
 *
 * Does not change search results.
 */
export function getSearchStats(
  query,
  access =
    SEARCH_ACCESS.PUBLIC
) {

  const results =
    search(
      query,
      access
    );


  const counts = {

    total:
      results.length,

    accessible: 0,

    locked: 0,

    upgrade: 0,

    purchase: 0,

    club: 0,

    preview: 0,

  };


  results.forEach(
    (result) => {

      const state =
        result?.accessState;


      if (
        Object.prototype.hasOwnProperty.call(
          counts,
          state
        )
      ) {

        counts[state] += 1;
      }
    }
  );


  return {

    query,

    access,

    ...counts,

  };
}


/* =========================================================
   DEBUG SEARCH
   ========================================================= */

/**
 * Development helper.
 *
 * Example:
 *
 * debugSearch(
 *   "3rd man run",
 *   "public"
 * );
 */
export function debugSearch(
  query,
  access =
    SEARCH_ACCESS.PUBLIC
) {

  const analysis =
    analyzeQuery(
      query
    );


  const results =
    search(
      query,
      access
    );


  console.group(
    "DPF OS SEARCH"
  );


  console.log(
    "QUERY:",
    query
  );


  console.log(
    "ANALYSIS:",
    analysis
  );


  console.log(
    "ACCESS:",
    access
  );


  console.log(
    "RESULT COUNT:",
    results.length
  );


  console.table(
    results.map(
      (result) => ({

        title:
          result.title,

        type:
          result.type,

        access:
          result.access,

        state:
          result.accessState,

        accessible:
          result.accessible,

        score:
          result.score,

        matched:
          result.matchedFields?.join(
            ", "
          ),

      })
    )
  );


  console.groupEnd();


  return results;
}


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default search;