import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import authService from "../../infrastructure/auth/auth-service.js";
import identityService from "../../infrastructure/auth/identity-service.js";

import {
  createAnonymousDPFSession,
  createDPFSession,
} from "../../infrastructure/auth/auth-session.js";

import {
  createDPFAccessContextFromSession,
} from "./auth-access.js";

import { DPFAuthContext } from "./auth-context-value.js";

export function DPFAuthProvider({ children }) {
  const [session, setSession] = useState(
    createAnonymousDPFSession()
  );

  const [clubId, setClubId] = useState(null);

  const [loading, setLoading] = useState(true);

  const hydrateSession = useCallback(
    async (authSession) => {
      if (!authSession?.access_token || !authSession?.user) {
        setClubId(null);
        return createAnonymousDPFSession();
      }

      const identity =
        await identityService.loadIdentity(
          authSession.user.id
        );

      const nextSession =
        createDPFSession(
          authSession,
          {
            profile: identity.profile,
            clubMemberships:
              identity.clubMemberships,
            entitlements:
              identity.entitlements,
          }
        );

      setSession(nextSession);

      return nextSession;
    },
    []
  );

  const refreshSession = useCallback(async () => {
    setLoading(true);

    try {
      const { data, error } =
        await authService.getSession();

      if (error) {
        throw error;
      }

      return await hydrateSession(
        data?.session ?? null
      );
    } catch (error) {
      console.error(
        "DPF Auth session refresh failed:",
        error
      );

      const anonymous =
        createAnonymousDPFSession();

      setSession(anonymous);
      setClubId(null);

      return anonymous;
    } finally {
      setLoading(false);
    }
  }, [hydrateSession]);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const { data, error } =
          await authService.getSession();

        if (error) {
          throw error;
        }

        const authSession =
          data?.session ?? null;

        if (!authSession) {
          if (mounted) {
            setSession(
              createAnonymousDPFSession()
            );
            setClubId(null);
          }

          return;
        }

        const identity =
          await identityService.loadIdentity(
            authSession.user.id
          );

        if (mounted) {
          setSession(
            createDPFSession(
              authSession,
              {
                profile: identity.profile,
                clubMemberships:
                  identity.clubMemberships,
                entitlements:
                  identity.entitlements,
              }
            )
          );
        }
      } catch (error) {
        console.error(
          "DPF Auth initialization failed:",
          error
        );

        if (mounted) {
          setSession(
            createAnonymousDPFSession()
          );
          setClubId(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initialize();

    const {
      data: { subscription },
    } = authService.onAuthStateChange(
      (_event, nextAuthSession) => {
        if (!mounted) {
          return;
        }

        if (!nextAuthSession) {
          setSession(
            createAnonymousDPFSession()
          );
          setClubId(null);
          setLoading(false);
          return;
        }

        setLoading(true);

        Promise.resolve(
          identityService.loadIdentity(
            nextAuthSession.user.id
          )
        )
          .then((identity) => {
            if (!mounted) {
              return;
            }

            setSession(
              createDPFSession(
                nextAuthSession,
                {
                  profile: identity.profile,
                  clubMemberships:
                    identity.clubMemberships,
                  entitlements:
                    identity.entitlements,
                }
              )
            );
          })
          .catch((error) => {
            console.error(
              "DPF Auth identity hydration failed:",
              error
            );

            if (mounted) {
              setSession(
                createDPFSession(
                  nextAuthSession
                )
              );
            }
          })
          .finally(() => {
            if (mounted) {
              setLoading(false);
            }
          });
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const accessContext = useMemo(
    () =>
      createDPFAccessContextFromSession(
        session,
        { clubId }
      ),
    [session, clubId]
  );

  const signUp = useCallback(
    ({ email, password } = {}) =>
      authService.signUp({
        email,
        password,
      }),
    []
  );

  const signIn = useCallback(
    ({ email, password } = {}) =>
      authService.signIn({
        email,
        password,
      }),
    []
  );

  const signInWithOAuth = useCallback(
    (provider, options = {}) =>
      authService.signInWithOAuth(
        provider,
        options
      ),
    []
  );

  const sendPasswordReset = useCallback(
    (email, options = {}) =>
      authService.sendPasswordReset(
        email,
        options
      ),
    []
  );

  const updatePassword = useCallback(
    (password) =>
      authService.updatePassword(password),
    []
  );

  const signOut = useCallback(
    async () => {
      const result =
        await authService.signOut();

      setSession(
        createAnonymousDPFSession()
      );

      setClubId(null);

      return result;
    },
    []
  );

  const value = useMemo(
    () => ({
      ...session,
      session,
      accessContext,
      clubId,
      setClubId,
      loading,
      refreshSession,
      signUp,
      signIn,
      signInWithOAuth,
      sendPasswordReset,
      updatePassword,
      signOut,
    }),
    [
      session,
      accessContext,
      clubId,
      loading,
      refreshSession,
      signUp,
      signIn,
      signInWithOAuth,
      sendPasswordReset,
      updatePassword,
      signOut,
    ]
  );

  return (
    <DPFAuthContext.Provider value={value}>
      {children}
    </DPFAuthContext.Provider>
  );
}

export default DPFAuthContext;
