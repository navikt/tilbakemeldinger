import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { urls } from 'Config';
import { useStore } from 'providers/Provider';
import { logLinkClick } from 'utils/amplitude';
import { Link, LinkPanel } from '@navikt/ds-react';
import { Locale } from 'utils/locale';

export interface Props {
    tittel: string;
    beskrivelse: string;
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
            as={(p) => {
                return props.external ? (
                    <a href={props.to} {...p}>
                        {p.children}
                    </a>
                ) : (
                    <RouterLink to={props.to} {...p}>
                        {p.children}
                    </RouterLink>
                );
            }}
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
