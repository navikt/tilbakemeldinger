import React from 'react';
import { lenker } from './TilbakemeldingerLenker';
import Header from 'components/header/Header';
import Lenkepanel from 'components/lenkepanel/Lenkepanel';
import { useIntl } from 'react-intl';
import { useStore } from 'providers/Provider';
import { MetaTags } from 'components/metatags/MetaTags';
import { paths } from 'common/paths';
import appStyle from 'src/App.module.scss';
import { useEffect } from 'react';

const Tilbakemeldinger = () => {
    const intl = useIntl();
    const [{ locale }] = useStore();

    useEffect(() => {
        if (!window.location.hostname.includes('localhost')) {
            const localeVariation = locale === 'en' ? 'en' : '';
            history.replaceState(
                {},
                '',
                `/tilbakemeldinger/${localeVariation}`
            );
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
                <Lenkepanel
                    key={lenke.tittel}
                    tittel={intl.messages[lenke.tittel] as string}
                    to={lenke.lenke}
                />
            ))}
        </div>
    );
};
export default Tilbakemeldinger;
