import React, { useEffect } from 'react';
import { localePath } from '#client/utils/locale.ts';
import { useIntl } from 'react-intl';
import { useStore } from '#client/providers/Provider.tsx';
import Environment from '#client/Environments.ts';
import { logPageview } from '#client/utils/analytics.ts';
import { Helmet } from 'react-helmet-async';
import { paths } from '#shared/paths.ts';
import type { ReactNode } from 'react';

type Props = {
	path: string;
	titleId: string;
	descriptionId?: string;
	children?: ReactNode;
};

export const MetaTags = ({ path, titleId, descriptionId, children }: Props) => {
	const intl = useIntl();
	const [{ locale }] = useStore();
	const baseUrl = Environment().baseUrl;
	const title = intl.formatMessage({ id: titleId });

	useEffect(() => {
		logPageview(title);
	}, [title]);

	return (
		<Helmet>
			{titleId && <title>{`${title} - www.nav.no`}</title>}
			{descriptionId && <meta name="description" content={intl.formatMessage({ id: descriptionId })} />}
			{(path || path === '') && (
				<link rel="canonical" href={`${baseUrl}${paths.kontaktOss.forside}${localePath(path, locale)}`} />
			)}
			{children}
		</Helmet>
	);
};
