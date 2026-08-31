// Replaces the old src/global.d.ts, which declared `interface ImportMeta { env }`
// and collided with vite/client's own `readonly env: ImportMetaEnv` — a conflict
// only masked by `skipLibCheck`. Augmenting ImportMetaEnv is the supported form.
//
// The shape comes from env.schema.ts so there is one definition, not two.

// Removes vite's `Record<string, any>` index fallback, so reading a VITE_ var
// that is not declared in the schema becomes a compile error instead of `any`.
interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

type ClientEnv = import('../env.schema.js').ClientEnv;

// Must be an empty extending interface: this merges with vite/client's own
// ImportMetaEnv declaration. Listing members here would duplicate the schema.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ImportMetaEnv extends ClientEnv {}
