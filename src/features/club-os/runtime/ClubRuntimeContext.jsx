import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  bootstrapClubRuntime,
} from "../../../core/index.js";

const ClubRuntimeContext =
  createContext(null);

export function ClubRuntimeProvider({
  clubId,
  children,
}) {
  const [runtime, setRuntime] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const refresh =
    useCallback(async () => {
      if (!clubId) {
        setRuntime(null);
        setError(
          "Club ID is required."
        );
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const nextRuntime =
          await bootstrapClubRuntime({
            clubId,
          });

        setRuntime(nextRuntime);
      } catch (runtimeError) {
        console.error(
          "[DPF Club Runtime]",
          runtimeError
        );

        setRuntime(null);

        setError(
          runtimeError.message ||
            "Unable to load club runtime."
        );
      } finally {
        setLoading(false);
      }
    }, [clubId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      club:
        runtime?.club ?? null,

      teams:
        runtime?.teams ?? [],

      seasons:
        runtime?.seasons ?? [],

      players:
        runtime?.players ?? [],

      context:
        runtime?.context ?? null,

      runtime,

      loading,

      error,

      refresh,
    }),
    [
      runtime,
      loading,
      error,
      refresh,
    ]
  );

  return (
    <ClubRuntimeContext.Provider
      value={value}
    >
      {children}
    </ClubRuntimeContext.Provider>
  );
}

export default ClubRuntimeContext;