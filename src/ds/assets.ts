// Every file under src/ds/assets, resolved to the URL Vite serves it at (hashed in a build, so the
// service worker can precache it in phase 8). Keys are the design system's own relative paths
// ('assets/Classes/01-provider-board.png'), so data copied from it resolves unchanged.
const files = import.meta.glob<string>('./assets/**/*.{png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function asset(path: string): string {
  const url = files[`./${path}`];
  if (url === undefined) throw new Error(`Unknown design-system asset: ${path}`);
  return url;
}

export const ASSET_PATHS: readonly string[] = Object.keys(files).map((k) => k.slice(2));
