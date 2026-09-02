import { supabase } from "../../lib/supabase.js";

function assertUserId(userId) {
  if (!userId || typeof userId !== "string") {
    throw new Error("A valid userId is required.");
  }

  return userId;
}

function normalizeProfile(profile) {
  if (!profile) {
    return null;
  }

  return {
    id: profile.id ?? null,
    displayName: profile.display_name ?? null,
    globalRole: profile.global_role ?? "standard",
    createdAt: profile.created_at ?? null,
    updatedAt: profile.updated_at ?? null,
  };
}

function normalizeMembership(membership) {
  if (!membership) {
    return null;
  }

  return {
    userId: membership.user_id ?? null,
    clubId: membership.club_id ?? null,
    role: membership.role ?? null,
    status: membership.status ?? null,
    createdAt: membership.created_at ?? null,
    updatedAt: membership.updated_at ?? null,
  };
}

function normalizeEntitlement(entitlement) {
  if (!entitlement) {
    return null;
  }

  return {
    userId: entitlement.user_id ?? null,
    entitlementId: entitlement.entitlement_id ?? null,
    status: entitlement.status ?? null,
    startsAt: entitlement.starts_at ?? null,
    expiresAt: entitlement.expires_at ?? null,
    source: entitlement.source ?? null,
    createdAt: entitlement.created_at ?? null,
    updatedAt: entitlement.updated_at ?? null,
  };
}

function isCurrentlyActiveEntitlement(entitlement, now = new Date()) {
  if (!entitlement || entitlement.status !== "active") {
    return false;
  }

  const startsAt = entitlement.startsAt
    ? new Date(entitlement.startsAt)
    : null;

  const expiresAt = entitlement.expiresAt
    ? new Date(entitlement.expiresAt)
    : null;

  if (startsAt && !Number.isNaN(startsAt.getTime()) && startsAt > now) {
    return false;
  }

  if (expiresAt && !Number.isNaN(expiresAt.getTime()) && expiresAt <= now) {
    return false;
  }

  return true;
}

export const identityService = {
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return data?.user ?? null;
  },

  async getProfile(userId) {
    const id = assertUserId(userId);

    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, display_name, global_role, created_at, updated_at"
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return normalizeProfile(data);
  },

  async getClubMemberships(userId) {
    const id = assertUserId(userId);

    const { data, error } = await supabase
      .from("club_memberships")
      .select(
        "user_id, club_id, role, status, created_at, updated_at"
      )
      .eq("user_id", id)
      .eq("status", "active");

    if (error) {
      throw error;
    }

    return (data ?? [])
      .map(normalizeMembership)
      .filter(Boolean);
  },

  async getEntitlements(userId) {
    const id = assertUserId(userId);

    const { data, error } = await supabase
      .from("user_entitlements")
      .select(
        "user_id, entitlement_id, status, starts_at, expires_at, source, created_at, updated_at"
      )
      .eq("user_id", id)
      .eq("status", "active");

    if (error) {
      throw error;
    }

    const now = new Date();

    return (data ?? [])
      .map(normalizeEntitlement)
      .filter(entitlement =>
        isCurrentlyActiveEntitlement(entitlement, now)
      );
  },

  async loadIdentity(userId) {
    const id = assertUserId(userId);

    const [
      profile,
      clubMemberships,
      entitlements,
    ] = await Promise.all([
      this.getProfile(id),
      this.getClubMemberships(id),
      this.getEntitlements(id),
    ]);

    return {
      profile,
      clubMemberships,
      entitlements,
    };
  },

  async loadCurrentIdentity() {
    const user = await this.getCurrentUser();

    if (!user) {
      return null;
    }

    const identity = await this.loadIdentity(user.id);

    return {
      user,
      ...identity,
    };
  },
};

export default identityService;
