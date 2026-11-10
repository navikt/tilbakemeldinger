// @vitest-environment jsdom
import { expect, test, vi } from 'vitest';
import { BASE, hydrateApp } from '#test/render.tsx';
import { render as renderOnServer } from '#client/main-server.tsx';
import { paths } from '#shared/paths.ts';

const forms = [
	paths.tilbakemeldinger.serviceklage.form,
	paths.tilbakemeldinger.feilogmangler,
	paths.tilbakemeldinger.rostilnav,
];
const pages = [
	...['nb', 'nn', 'en'].flatMap((locale) => forms.map((form) => `/${locale}${form}`)),
	// The 404 page
	'/nn/tilbakemeldinger/made-up',
];

// React 19 hydrates strictly: where the browser renders anything else than the server did, React throws away the
// server's HTML and renders the page anew
test.each(pages)('hydrates the server-rendered %s as is', (path) => {
	// The server's HTML in <main>, with nothing around it (server/site/page.ts)
	const main = document.createElement('main');
	main.id = 'maincontent';
	main.innerHTML = renderOnServer(`${BASE}${path}`).html;
	document.body.append(main);
	const serverElements = [...main.querySelectorAll('*')];
	// React reports mismatched attributes in the console only
	const consoleError = vi.spyOn(console, 'error');

	const { onRecoverableError } = hydrateApp(path, main);

	expect(onRecoverableError).not.toHaveBeenCalled();
	expect(consoleError).not.toHaveBeenCalled();
	// The page is still the server's elements, not new ones
	expect(serverElements.filter((element) => !element.isConnected)).toEqual([]);
});
