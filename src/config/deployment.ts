/**
 * The application now owns the root domain, so asset paths no longer need the
 * legacy /websites base path. Kept as a helper for existing website components.
 */
export const basePath = "";

export function withBasePath(path: string) {
  return path;
}
