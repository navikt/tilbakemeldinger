import React from 'react';
import { renderToString } from 'react-dom/server';
import { AppRoot } from './index';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import type { SsrRender } from '#shared/types/ssr.ts';

type HelmetContext = {
	helmet?: HelmetServerState;
};

export const render: SsrRender = (url) => {
	const helmetContext: HelmetContext = {};

	const html = renderToString(
		<HelmetProvider context={helmetContext}>
			<AppRoot url={url} />
		</HelmetProvider>
	);

	const { helmet } = helmetContext;

	return { html, helmet };
};
