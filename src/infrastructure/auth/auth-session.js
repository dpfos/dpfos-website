function normalizeUser(user, role = null) {
  if (!user) return null;

  return {
    id: user.id ?? null,
    email: user.email ?? null,
    role:
      role ??
      user.app_metadata?.role ??
      user.user_metadata?.role ??
      null,
    metadata: user.user_metadata ?? {},
    appMetadata: user.app_metadata ?? {},
  };
}

export function createDPFSession(
  session = null,
  {
    profile = null,
    clubMemberships = [],
    entitlements = [],
  } = {}
) {
  const initialUser = session?.user ?? null;

  const resolvedRole =
    profile?.globalRole ??
    initialUser?.app_metadata?.role ??
    initialUser?.user_metadata?.role ??
    null;

  const user = normalizeUser(
    initialUser,
    resolvedRole
  );

  return {
    isAuthenticated: Boolean(
      session?.access_token && user
    ),
    user,
    profile,
    accessToken: session?.access_token ?? null,
    refreshToken: session?.refresh_token ?? null,
    expiresAt: session?.expires_at ?? null,
    role: resolvedRole,
    permissions: [],
    entitlements: Array.isArray(entitlements)
      ? entitlements
      : [],
    clubMemberships: Array.isArray(clubMemberships)
      ? clubMemberships
      : [],
  };
}

export function createDPFSessionFromUser(user = null) {
  return createDPFSession(
    user
      ? {
          user,
        }
      : null
  );
}

export function isDPFSession(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (typeof value.isAuthenticated !== "boolean") {
    return false;
  }

  if (!Array.isArray(value.permissions)) {
    return false;
  }

  if (!Array.isArray(value.entitlements)) {
    return false;
  }

  if (!Array.isArray(value.clubMemberships)) {
    return false;
  }

  return true;
}

export function createAnonymousDPFSession() {
  return createDPFSession(null);
}

export { normalizeUser };

export default createDPFSession;