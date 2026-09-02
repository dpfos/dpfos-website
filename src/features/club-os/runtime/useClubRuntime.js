import { useContext } from "react";

import ClubRuntimeContext from "./ClubRuntimeContext";

export function useClubRuntime() {
  const context =
    useContext(ClubRuntimeContext);

  if (!context) {
    throw new Error(
      "useClubRuntime must be used within ClubRuntimeProvider."
    );
  }

  return context;
}

export default useClubRuntime;