import { renderToString } from 'react-dom/server';
import { AppRoot } from './index';
import { setConfig } from '#client/appConfig.ts';
import { findPage, notFoundHead, pageHead } from '#client/pages/pages.ts';
import { getLocaleFromUrl } from '#shared/appPath.ts';
import type { SsrRender } from '#shared/types/ssr.ts';

// Where the client build's files are served from (the CDN when deployed), for the page's script and style tags
export const base = import.meta.env.BASE_URL;

export const render: SsrRender = (path, config) => {
	setConfig(config);
	const page = findPage(path);
	const locale = getLocaleFromUrl(path);

	return {
		html: renderToString(<AppRoot url={path} />),
		head: page ? pageHead(page, locale) : notFoundHead(locale),
		status: page ? 200 : 404,
	};
};
