import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { urls } from 'Config';
import { useStore } from 'providers/Provider';
import { logLinkClick } from 'utils/amplitude';
import { Link, LinkPanel } from '@navikt/ds-react';

export interface Props {
    id: string;
    tittel: string;
    beskrivelse: string;
    lenkeTekst: string;
    to: string;
    external?: boolean;
    icon?: string;
}

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
            {props.icon && <img src={props.icon} alt="" />}
            <LinkPanel.Title> {props.tittel}</LinkPanel.Title>
            <LinkPanel.Description>
                <FormattedMessage
                    id={props.beskrivelse}
                    values={{
                        KlagerettigheterLenke: (children: ReactNode[]) => (
                            <Link
                                href={
                                    urls.tilbakemeldinger.klagerettigheter[
                                        locale
                                    ]
                                }
                            >
                                {children}
                            </Link>
                        ),
                    }}
                />
            </LinkPanel.Description>
        </LinkPanel>
    );
};

export default Lenkepanel;
