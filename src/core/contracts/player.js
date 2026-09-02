/*
============================================================
DPF OS — PLAYER CONTRACT
============================================================

Purpose
------------------------------------------------------------
Canonical domain contract for a player inside DPF Club OS.

The Player entity represents core player identity and football
profile information.

Performance, development, scouting, medical and other
specialized records belong to separate domains and are
intentionally not embedded here.
============================================================
*/

export function createPlayer({
  id = null,
  clubId = null,
  firstName = "",
  lastName = "",
  displayName = "",
  dateOfBirth = null,
  nationality = null,
  preferredFoot = null,
  primaryPosition = null,
  status = "active",
  metadata = {},
} = {}) {
  return {
    id,
    clubId,
    firstName,
    lastName,
    displayName:
      displayName ||
      [firstName, lastName]
        .filter(Boolean)
        .join(" "),
    dateOfBirth,
    nationality,
    preferredFoot,
    primaryPosition,
    status,
    metadata:
      metadata &&
      typeof metadata === "object" &&
      !Array.isArray(metadata)
        ? metadata
        : {},
  };
}

export function isPlayer(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (!value.id) {
    return false;
  }

  if (!value.clubId) {
    return false;
  }

  if (!value.displayName) {
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
