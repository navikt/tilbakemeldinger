import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { urls } from 'Config';
import { useStore } from 'providers/Provider';
import { logLinkClick } from 'utils/amplitude';
import { Link, LinkPanel } from '@navikt/ds-react';

interface FormattedMessageWithLinkProps {
    beskrivelse: string;
    locale: string;
}

interface KlagerettigheterUrls {
    [key: string]: string;
    nb: string;
    en: string;
    nn: string;
}

const FormattedMessageWithLink = ({
    beskrivelse,
    locale,
}: FormattedMessageWithLinkProps) => (
    <FormattedMessage
        id={beskrivelse}
        values={{
            KlagerettigheterLenke: (children: ReactNode[]) => (
                <Link
                    href={
                        (
                            urls.tilbakemeldinger
                                .klagerettigheter as KlagerettigheterUrls
                        )[locale]
                    }
                    // Use the index signature to access the correct URL
                >
                    {children}
                </Link>
            ),
        }}
    />
);

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
            {props.icon && (
                <img className="lenkePanel__ikon" src={props.icon} alt="" />
            )}
            <div>
                <LinkPanel.Title> {props.tittel}</LinkPanel.Title>
                <LinkPanel.Description>
                    <FormattedMessageWithLink
                        beskrivelse={props.beskrivelse}
                        locale={locale}
                    />
                </LinkPanel.Description>
            </div>
        </LinkPanel>
    );
};

export default Lenkepanel;
