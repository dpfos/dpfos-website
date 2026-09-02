import { useContext } from "react";
import { DPFAuthContext } from "./auth-context-value.js";

export function useDPFAuth() {
  const context = useContext(DPFAuthContext);

  if (!context) {
    throw new Error(
      "useDPFAuth must be used within DPFAuthProvider."
    );
  }

  return context;
}

export default useDPFAuth;
