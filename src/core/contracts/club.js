/*
============================================================
DPF OS — CLUB CONTRACT
============================================================

Purpose
------------------------------------------------------------
Canonical domain contract for a football club inside DPF OS.

This contract defines the shape of the Club entity.
It does not contain persistence logic, authentication,
authorization, UI state, or business workflows.

Notes
------------------------------------------------------------
organizationId is an optional organizational scope reference.
It is not required for the validity of a Club entity at this
stage of the Core Domain.

============================================================
*/

export function createClub({
  id = null,
  organizationId = null,
  name = "",
  status = "active",
  timezone = null,
  locale = "en",
  metadata = {},
} = {}) {
  return {
    id,
    organizationId,
    name,
    status,
    timezone,
    locale,
    metadata:
      metadata &&
      typeof metadata === "object" &&
      !Array.isArray(metadata)
        ? metadata
        : {},
  };
}

export function isClub(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (!value.id) {
    return false;
  }

  if (!value.name) {
    return false;
  }

  if (
    !value.metadata ||
    typeof value.metadata !== "object" ||
    Array.isArray(value.metadata)
  ) {
    return false;
  }

  return true;
}