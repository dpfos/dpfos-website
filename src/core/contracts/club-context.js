/*
============================================================
DPF OS — CLUB CONTEXT CONTRACT
============================================================

Purpose
------------------------------------------------------------
Canonical runtime context for operations performed inside
DPF Club OS.

This contract does NOT authenticate users.
This contract does NOT authorize users.
It represents the already-resolved operational context.

Architecture
------------------------------------------------------------
Identity
    ↓
Membership
    ↓
Role / Permissions
    ↓
ClubContext
    ↓
Application / Domain Operations
============================================================
*/

export function createClubContext({
  userId = null,
  organizationId = null,
  clubId = null,
  teamId = null,
  seasonId = null,
  role = null,
  permissions = [],
  entitlements = [],
} = {}) {
  return {
    userId,
    organizationId,
    clubId,
    teamId,
    seasonId,
    role,
    permissions: Array.isArray(permissions)
      ? permissions
      : [],
    entitlements: Array.isArray(entitlements)
      ? entitlements
      : [],
  };
}

export function isClubContext(context) {
  if (!context || typeof context !== "object") {
    return false;
  }

  if (!context.clubId) {
    return false;
  }

  if (!Array.isArray(context.permissions)) {
    return false;
  }

  if (!Array.isArray(context.entitlements)) {
    return false;
  }

  return true;
}
