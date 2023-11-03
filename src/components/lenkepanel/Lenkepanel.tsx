import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { urls } from 'Config';
import { useStore } from 'providers/Provider';
import { logLinkClick } from 'utils/amplitude';
import { Link, LinkPanel } from '@navikt/ds-react';
import { Locale } from 'utils/locale';

export interface Props {
    id: string;
    tittel: string;
    beskrivelse: string;
    lenkeTekst: string;
    to: string;
    external?: boolean;
    icon?: string;
}

const KlagerettigheterLenke = (children: ReactNode[], locale: Locale) => (
    <Link
        className={'lenke'}
        href={urls.tilbakemeldinger.klagerettigheter[locale]}
    >
        {children}
    </Link>
);

const Lenkepanel = (props: Props) => {
    const [{ locale }] = useStore();
    return (
        <LinkPanel
            href={props.to}
            border
            onClick={() =>
                logLinkClick(props.to, props.tittel, 'tilbakemelding')
            }
        >
            {props.icon && (
                <img className="lenkePanel__ikon" src={props.icon} alt="" />
            )}
            <div>
                <LinkPanel.Title> {props.tittel}</LinkPanel.Title>
                <LinkPanel.Description>
                    <FormattedMessage
                        id={props.beskrivelse}
                        values={{
                            KlagerettigheterLenke: (children: ReactNode[]) =>
                                KlagerettigheterLenke(children, locale),
                        }}
                    />
                </LinkPanel.Description>
            </div>
        </LinkPanel>
    );
};

export default Lenkepanel;
