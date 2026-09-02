/*
============================================================
DPF OS — REPOSITORY REGISTRY
============================================================

Purpose
------------------------------------------------------------
Canonical registry for DPF OS repositories.

The registry provides one stable access point for domain
repositories without coupling application code to a specific
storage implementation.

The registry does NOT:
- store data
- authenticate users
- authorize access
- choose Local vs Cloud
- perform synchronization
============================================================
*/

const repositories = new Map();

export function registerRepository(name, repository) {
  if (!name || typeof name !== "string") {
    throw new Error(
      "Repository name must be a non-empty string."
    );
  }

  if (!repository || typeof repository !== "object") {
    throw new Error(
      `Repository "${name}" must be an object.`
    );
  }

  if (repositories.has(name)) {
    throw new Error(
      `Repository "${name}" is already registered.`
    );
  }

  repositories.set(name, repository);

  return repository;
}

export function getRepository(name) {
  if (!name || typeof name !== "string") {
    return null;
  }

  return repositories.get(name) ?? null;
}

export function hasRepository(name) {
  return repositories.has(name);
}

export function listRepositories() {
  return Array.from(repositories.keys());
}

export function clearRepositories() {
  repositories.clear();
}
