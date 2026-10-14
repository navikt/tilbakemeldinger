import type { Handler } from 'hono';
import { html } from 'hono/html';
import { appPath } from '#shared/appPath.ts';
import { type Locale, translate } from '#shared/locale.ts';
import { paths } from '#shared/paths.ts';
import type { AppEnv } from '#server/types.ts';

const links = [
	{ title: 'tilbakemeldinger.serviceklage.tittel', page: paths.tilbakemeldinger.serviceklage.form },
	{ title: 'tilbakemeldinger.feil-og-mangler.sidetittel', page: paths.tilbakemeldinger.feilogmangler },
	{ title: 'tilbakemeldinger.ros-til-nav.sidetittel', page: paths.tilbakemeldinger.rostilnav },
];

// A bare list of links to the forms. Deployed, the editorial front page replaces it (see site.ts)
export const localFrontPage: Handler<AppEnv> = (c) => {
	const locale = c.req.param('locale') as Locale;
	const title = translate(locale, 'tilbakemeldinger.tilbakemeldinger.sidetittel');
	const renderedLinks = links.map(
		({ title, page }) => html`<li><a href="${appPath(locale, page)}">${translate(locale, title)}</a></li>`
	);

	return c.html(html`<!doctype html>
		<html lang="${locale}">
			<head>
				<meta charset="utf-8" />
				<title>${title}</title>
			</head>
			<body>
				<h1>${title}</h1>
				<ul>
					${renderedLinks}
				</ul>
			</body>
		</html>`);
};
