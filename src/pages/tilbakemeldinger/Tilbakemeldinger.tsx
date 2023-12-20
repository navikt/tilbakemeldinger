import React from 'react';
import { lenker } from './TilbakemeldingerLenker';
import Header from 'components/header/Header';
import Lenkepanel from 'components/lenkepanel/Lenkepanel';
import { useIntl } from 'react-intl';
import { useStore } from 'providers/Provider';
import { MetaTags } from 'components/metatags/MetaTags';
import { paths } from 'common/Config';
import appStyle from 'src/App.module.scss';

const Tilbakemeldinger = () => {
    const intl = useIntl();
    const [{ locale }] = useStore();

    console.log('FOrside');

    return (
        <div className={appStyle.pageContent}>
            <MetaTags
                path={paths.tilbakemeldinger.forside}
                titleId={'tilbakemeldinger.sidetittel'}
                descriptionId={'seo.tilbakemeldinger.description'}
            />
            <Header
                title={intl.formatMessage({
                    id: 'tilbakemeldinger.sidetittel',
                })}
            />
            {lenker(locale).map((lenke) => (
                <Lenkepanel
                    icon={lenke.icon}
                    key={lenke.tittel}
                    tittel={intl.messages[lenke.tittel] as string}
                    beskrivelse={lenke.beskrivelse}
                    to={lenke.lenke}
                    external={lenke.external}
                />
            ))}
        </div>
    );
};
export default Tilbakemeldinger;
