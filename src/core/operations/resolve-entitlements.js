import {
  createDPFAccessContext,
} from "../access/accessContext.js";

export function resolveEntitlements({
  session,
} = {}) {
  if (!session) {
    throw new Error(
      "Session is required."
    );
  }

  return createDPFAccessContext(
    session
  );
}

export default resolveEntitlements;