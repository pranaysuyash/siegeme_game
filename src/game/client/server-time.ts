/** Convert a local wall-clock reading into the authority's wall-clock domain. */
export function serverNow(localNow: number, serverClockSkewMs: number) {
  return localNow + serverClockSkewMs;
}

/** Derive the signed offset from an authority response and local observation. */
export function serverClockSkew(authorityNow: number, localNow: number) {
  return authorityNow - localNow;
}
