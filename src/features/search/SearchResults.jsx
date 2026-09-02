import React from "react";

/**
 * DPF OS
 * Search Results
 *
 * Responsible for:
 * - Rendering search results
 * - Detecting knowledge type
 * - Routing the user to the correct destination
 * - Supporting Books, Concepts, Tools, Performance,
 *   Technology, Research, AI and other knowledge entities
 */

const TYPE_LABELS = {
  book: "BOOK",
  concept: "CONCEPT",
  glossary: "GLOSSARY",
  tool: "TOOL",
  toolkit: "TOOLKIT",
  performance: "PERFORMANCE",
  technology: "TECHNOLOGY",
  research: "RESEARCH",
  ai: "AI",
  education: "EDUCATION",
  academy: "ACADEMY",
  methodology: "METHODOLOGY",
  system: "SYSTEM",
};

/**
 * Convert any value into a safe string.
 */
function safeString(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

/**
 * Create a clean URL slug.
 */
function createSlug(value) {
  return safeString(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Normalize different result structures
 * coming from the DPF knowledge sources.
 */
function normalizeResult(item, index) {
  if (!item) {
    return null;
  }

  const title =
    item.title ||
    item.name ||
    item.label ||
    item.term ||
    item.bookTitle ||
    "Untitled Knowledge";

  const rawType =
    item.type ||
    item.kind ||
    item.entityType ||
    item.contentType ||
    item.categoryType ||
    "concept";

  const type = safeString(rawType)
    .trim()
    .toLowerCase();

  const slug =
    item.slug ||
    item.id ||
    item.key ||
    item.termSlug ||
    createSlug(title);

  const description =
    item.description ||
    item.definition ||
    item.summary ||
    item.excerpt ||
    item.subtitle ||
    "";

  const category =
    item.category ||
    item.domain ||
    item.area ||
    item.section ||
    item.bookCategory ||
    "";

  const version =
    item.version ||
    item.bookVersion ||
    "";

  const status =
    item.status ||
    "";

  const aliases =
    item.aliases ||
    item.alsoKnownAs ||
    item.synonyms ||
    [];

  const route =
    item.route ||
    item.href ||
    item.path ||
    null;

  const number =
    item.number ||
    item.volumeNumber ||
    item.bookNumber ||
    "";

  return {
    ...item,
    _index: index,
    _title: safeString(title),
    _type: type,
    _slug: safeString(slug),
    _description: safeString(description),
    _category: safeString(category),
    _version: safeString(version),
    _status: safeString(status),
    _aliases: Array.isArray(aliases)
      ? aliases
      : [aliases],
    _route: route,
    _number: safeString(number),
  };
}

/**
 * Resolve the correct destination for a result.
 *
 * Priority:
 *
 * 1. Explicit route from the registry
 * 2. Book route
 * 3. Type-based route
 */
function resolveRoute(item) {
  if (!item) {
    return "/";
  }

  if (item._route) {
    return item._route;
  }

  const type = item._type;
  const slug = item._slug;

  if (type === "book") {
    return `/library/${slug}`;
  }

  if (type === "concept" || type === "glossary") {
    return `/concept/${slug}`;
  }

  if (type === "tool" || type === "toolkit") {
    return `/tools/${slug}`;
  }

  if (type === "performance") {
    return `/performance/${slug}`;
  }

  if (type === "technology") {
    return `/technology/${slug}`;
  }

  if (type === "research") {
    return `/research/${slug}`;
  }

  if (type === "ai") {
    return `/technology/${slug}`;
  }

  if (type === "education") {
    return `/education/${slug}`;
  }

  if (type === "academy") {
    return `/library/${slug}`;
  }

  if (type === "methodology") {
    return `/library/${slug}`;
  }

  if (type === "system") {
    return `/platform/${slug}`;
  }

  return `/concept/${slug}`;
}

/**
 * Human-readable type label.
 */
function getTypeLabel(type) {
  return (
    TYPE_LABELS[type] ||
    safeString(type)
      .replace(/[-_]/g, " ")
      .toUpperCase()
  );
}

/**
 * Status badge.
 */
function getStatusLabel(item) {
  if (!item._status) {
    return "";
  }

  return item._status
    .replace(/[-_]/g, " ")
    .toUpperCase();
}

/**
 * Result icon.
 */
function ResultMark({ item }) {
  if (item._type === "book") {
    return (
      <div className="search-result-mark search-result-mark-book">
        {item._number || "•"}
      </div>
    );
  }

  return (
    <div className="search-result-mark">
      <span />
    </div>
  );
}

/**
 * Search result card.
 */
function SearchResultItem({
  item,
  onSelect,
}) {
  const route = resolveRoute(item);

  const handleClick = () => {
    if (typeof onSelect === "function") {
      onSelect(item, route);
      return;
    }

    window.location.href = route;
  };

  const aliases = item._aliases
    .filter(Boolean)
    .slice(0, 3)
    .map((alias) => safeString(alias))
    .join(" · ");

  const typeLabel = getTypeLabel(item._type);
  const statusLabel = getStatusLabel(item);

  return (
    <button
      type="button"
      className="search-result-item"
      onClick={handleClick}
    >
      <ResultMark item={item} />

      <div className="search-result-content">

        <div className="search-result-topline">
          <h3 className="search-result-title">
            {item._title}
          </h3>

          <div className="search-result-meta">
            {statusLabel && (
              <span className="search-result-status">
                {statusLabel}
              </span>
            )}

            <span className="search-result-type">
              {typeLabel}
            </span>
          </div>
        </div>

        <div className="search-result-category">
          {item._category || typeLabel}
          {item._version && (
            <>
              {" "}
              · {item._version}
            </>
          )}
        </div>

        {item._description && (
          <p className="search-result-description">
            {item._description}
          </p>
        )}

        {aliases && (
          <div className="search-result-aliases">
            {aliases}
          </div>
        )}

      </div>

      <div className="search-result-arrow">
        →
      </div>
    </button>
  );
}

/**
 * Empty state.
 */
function EmptyResults({ query }) {
  return (
    <div className="search-empty">

      <div className="search-empty-label">
        NO RESULTS
      </div>

      <h2>
        Nothing found for
        <span>
          “{query}”
        </span>
      </h2>

      <p>
        Try another keyword, book title,
        category or DPF concept.
      </p>

    </div>
  );
}

/**
 * SearchResults
 */
export default function SearchResults({
  results = [],
  query = "",
  onSelect,
  className = "",
}) {
  const normalizedResults = Array.isArray(results)
    ? results
        .map(normalizeResult)
        .filter(Boolean)
    : [];

  const cleanQuery = safeString(query).trim();

  if (!cleanQuery) {
    return (
      <div
        className={`search-results-empty-query ${className}`}
      >
        <div className="search-results-discovery">

          <div className="search-results-discovery-label">
            KNOWLEDGE DISCOVERY
          </div>

          <h2>
            Explore the
            <span> DPF OS Knowledge.</span>
          </h2>

        </div>
      </div>
    );
  }

  if (normalizedResults.length === 0) {
    return (
      <EmptyResults query={cleanQuery} />
    );
  }

  return (
    <div
      className={`search-results ${className}`}
    >

      <div className="search-results-header">
        <span>
          KNOWLEDGE
        </span>

        <span>
          {normalizedResults.length}{" "}
          {normalizedResults.length === 1
            ? "result"
            : "results"}
        </span>
      </div>

      <div className="search-results-list">
        {normalizedResults.map((item, index) => (
          <SearchResultItem
            key={`${item._type}-${item._slug}-${index}`}
            item={item}
            onSelect={onSelect}
          />
        ))}
      </div>

    </div>
  );
}
