import type { Handler } from 'hono';
import { html } from '@itsy/html';
import { frame } from '@itsy/html/frame';
import { appPath } from '#shared/appPath.ts';
import { type Locale, translate } from '#shared/locale.ts';
import { paths } from '#shared/paths.ts';
import type { AppEnv } from '#server/types.ts';

const links = [
	{ titleId: 'tilbakemeldinger.serviceklage.tittel', page: paths.tilbakemeldinger.serviceklage.form },
	{ titleId: 'tilbakemeldinger.feil-og-mangler.sidetittel', page: paths.tilbakemeldinger.feilogmangler },
	{ titleId: 'tilbakemeldinger.ros-til-nav.sidetittel', page: paths.tilbakemeldinger.rostilnav },
];

// A bare list of links to the forms. Deployed, the editorial front page replaces it (see site.ts)
export const localFrontPage: Handler<AppEnv> = (c) => {
	const locale = c.req.param('locale') as Locale;
	const title = translate(locale, 'tilbakemeldinger.tilbakemeldinger.sidetittel');
	const renderedLinks = links.map(
		({ titleId, page }) => html`<li><a href="${appPath(locale, page)}">${translate(locale, titleId)}</a></li>`
	);

	return c.html(
		frame({
			lang: locale,
			title,
			content: html`<h1>${title}</h1>
				<ul>
					${renderedLinks}
				</ul>`,
		}).markup
	);
};
