import type { FramePart } from '@itsy/html/frame';
import { joinURL } from 'ufo';

// The page's script and style tags

// The client build's entry (vite.config.ts)
export const entry = 'client/main-client.tsx';

export type Manifest = Record<string, { file: string; css?: string[]; imports?: string[] }>;

// In production: the client entry's styles and script, and its imported chunks, the way Vite writes them into an HTML entry
export const manifestAssets = (manifest: Manifest, base: string): FramePart[] => {
	const chunks = new Set<string>();
	const collect = (key: string) => {
		if (!chunks.has(key)) {
			chunks.add(key);
			manifest[key].imports?.forEach(collect);
		}
	};
	collect(entry);
	const imports = [...chunks].filter((key) => key !== entry);
	const css = new Set([...chunks].flatMap((key) => manifest[key].css ?? []));

	return [
		...[...css].map((file) => ({
			tag: 'link',
			attrs: { rel: 'stylesheet', crossorigin: true, href: joinURL(base, file) },
		})),
		{ tag: 'script', attrs: { type: 'module', crossorigin: true, src: joinURL(base, manifest[entry].file) } },
		...imports.map((key) => ({
			tag: 'link',
			attrs: { rel: 'modulepreload', crossorigin: true, href: joinURL(base, manifest[key].file) },
		})),
	];
};

// In development, Vite serves the code, and its client reloads it on changes
export const devAssets = (base: string): FramePart[] => [
	{ tag: 'script', attrs: { type: 'module', src: joinURL(base, '@vite/client') } },
	{ tag: 'script', attrs: { type: 'module', src: joinURL(base, entry) } },
];
