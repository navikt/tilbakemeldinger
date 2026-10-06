import React from 'react';
import { lenker } from './TilbakemeldingerLenker';
import Header from '#client/components/header/Header.tsx';
import Lenkepanel from '#client/components/lenkepanel/Lenkepanel.tsx';
import { useIntl } from 'react-intl';
import { useStore } from '#client/providers/Provider.tsx';
import { MetaTags } from '#client/components/metatags/MetaTags.tsx';
import { paths } from '#shared/paths.ts';
import appStyle from '#client/App.module.scss';
import { useEffect } from 'react';

const Tilbakemeldinger = () => {
	const intl = useIntl();
	const [{ locale }] = useStore();

	useEffect(() => {
		if (!window.location.hostname.includes('localhost')) {
			const localeVariation = locale === 'en' ? 'en' : '';
			history.replaceState({}, '', `/tilbakemeldinger/${localeVariation}`);
			window.location.href = `/tilbakemeldinger/${localeVariation}`;
		}
	}, []);

	return (
		<div className={appStyle.pageContent}>
			<MetaTags
				path={paths.tilbakemeldinger.forside}
				titleId={'tilbakemeldinger.tilbakemeldinger.sidetittel'}
				descriptionId={'seo.tilbakemeldinger.description'}
			/>
			<Header
				title={intl.formatMessage({
					id: 'tilbakemeldinger.tilbakemeldinger.sidetittel',
				})}
			/>
			{lenker(locale).map((lenke) => (
				<Lenkepanel key={lenke.tittel} tittel={intl.messages[lenke.tittel] as string} to={lenke.lenke} />
			))}
		</div>
	);
};
export default Tilbakemeldinger;
