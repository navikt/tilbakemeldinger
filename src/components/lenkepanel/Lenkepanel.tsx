import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { urls } from 'Config';
import { useStore } from 'providers/Provider';
import { logLinkClick } from 'utils/amplitude';
import { BodyLong, Heading, LinkPanel } from '@navikt/ds-react';

export interface Props {
    id: string;
    tittel: string;
    beskrivelse?: string;
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
            border={true}
            className="linkbox__container"
            as={(p) => {
                return props.external ? (
                    <a href={props.to} {...p}>
                        {p.children}
                    </a>
                ) : (
                    <Link to={props.to} {...p}>
                        {p.children}
                    </Link>
                );
            }}
            onClick={() =>
                logLinkClick(props.to, props.tittel, 'tilbakemelding')
            }
        >
            <div className="lenkePanel__row">
                {props.icon && (
                    <div className="lenkePanel__icon-container">
                        <img
                            className="lenkePanel__icon"
                            src={props.icon}
                            alt=""
                        />
                    </div>
                )}
                <div>
                    <div className="lenkePanel__tittel">
                        <Heading level="2" size="small">
                            {props.tittel}
                        </Heading>
                    </div>
                    {props.beskrivelse && (
                        <BodyLong>
                            <FormattedMessage
                                id={props.beskrivelse}
                                values={{
                                    KlagerettigheterLenke: (
                                        children: ReactNode[]
                                    ) => (
                                        <a
                                            href={
                                                urls.tilbakemeldinger
                                                    .klagerettigheter[locale]
                                            }
                                        >
                                            {children}
                                        </a>
                                    ),
                                }}
                            />
                        </BodyLong>
                    )}
                </div>
            </div>
        </LinkPanel>
    );
};

export default Lenkepanel;
