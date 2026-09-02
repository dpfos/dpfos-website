/*
============================================================
DPF OS — TEAM CONTRACT
============================================================

Purpose
------------------------------------------------------------
Canonical domain contract for a team inside DPF Club OS.

A Team belongs to a Club and may operate within a Season.

Player membership is intentionally NOT stored inside the Team
entity. Membership is represented by a separate domain record.
============================================================
*/

export function createTeam({
  id = null,
  clubId = null,
  name = "",
  category = null,
  ageGroup = null,
  status = "active",
  metadata = {},
} = {}) {
  return {
    id,
    clubId,
    name,
    category,
    ageGroup,
    status,
    metadata:
      metadata &&
      typeof metadata === "object" &&
      !Array.isArray(metadata)
        ? metadata
        : {},
  };
}

export function isTeam(value) {
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
