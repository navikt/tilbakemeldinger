import { expect, test } from 'vitest';
import { devAssets, manifestAssets } from '#server/site/assets.ts';

const CDN = 'https://cdn.nav.test/tilbakemeldinger';

test('production pages load the entry, its stylesheets and its chunks from the CDN', () => {
	const manifest = {
		'client/main-client.tsx': {
			file: 'assets/main-client-a1.js',
			css: ['assets/main-client-a1.css'],
			imports: ['_shared-b2.js'],
		},
		'_shared-b2.js': { file: 'assets/shared-b2.js', css: ['assets/shared-b2.css'], imports: ['_tiny-c3.js'] },
		'_tiny-c3.js': { file: 'assets/tiny-c3.js', imports: ['_shared-b2.js'] },
		'node_modules/lazy.js': { file: 'assets/lazy-d4.js' },
	};

	expect(manifestAssets(manifest, CDN)).toEqual([
		{ tag: 'link', attrs: { rel: 'stylesheet', crossorigin: true, href: `${CDN}/assets/main-client-a1.css` } },
		{ tag: 'link', attrs: { rel: 'stylesheet', crossorigin: true, href: `${CDN}/assets/shared-b2.css` } },
		{ tag: 'script', attrs: { type: 'module', crossorigin: true, src: `${CDN}/assets/main-client-a1.js` } },
		{ tag: 'link', attrs: { rel: 'modulepreload', crossorigin: true, href: `${CDN}/assets/shared-b2.js` } },
		{ tag: 'link', attrs: { rel: 'modulepreload', crossorigin: true, href: `${CDN}/assets/tiny-c3.js` } },
	]);
});

test('in development, pages load the entry and Vite client from the dev server', () => {
	expect(devAssets('/person/kontakt-oss/')).toEqual([
		{ tag: 'script', attrs: { type: 'module', src: '/person/kontakt-oss/@vite/client' } },
		{ tag: 'script', attrs: { type: 'module', src: '/person/kontakt-oss/client/main-client.tsx' } },
	]);
});
