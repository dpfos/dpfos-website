export function createOperationalContext({
  context,
  club,
  team = null,
  season = null,
} = {}) {
  return {
    context,
    club,
    team,
    season,
  };
}

export function isOperationalContext(
  operationalContext
) {
  if (
    !operationalContext ||
    typeof operationalContext !== "object"
  ) {
    return false;
  }

  if (!operationalContext.context) {
    return false;
  }

  if (!operationalContext.club) {
    return false;
  }

  return true;
}
