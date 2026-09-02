/*
============================================================
DPF OS — SEASON CONTRACT
============================================================

Purpose
------------------------------------------------------------
Canonical domain contract for a football season inside
DPF Club OS.

A Season belongs to a Club and defines the operational
time boundary for football activities and records.
============================================================
*/

export function createSeason({
  id = null,
  clubId = null,
  name = "",
  startDate = null,
  endDate = null,
  status = "active",
  metadata = {},
} = {}) {
  return {
    id,
    clubId,
    name,
    startDate,
    endDate,
    status,
    metadata:
      metadata &&
      typeof metadata === "object" &&
      !Array.isArray(metadata)
        ? metadata
        : {},
  };
}

export function isSeason(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (!value.id) {
    return false;
  }

  if (!value.clubId) {
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
