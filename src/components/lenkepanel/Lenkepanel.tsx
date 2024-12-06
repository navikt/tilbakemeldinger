import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { logLinkClick } from 'utils/amplitude';
import { LinkPanel, LinkPanelProps } from '@navikt/ds-react';
import style from './Lenkepanel.module.scss';

export interface Props {
    tittel: string;
    to: string;
    external?: boolean;
    icon?: string;
}

const Lenkepanel = (props: Props) => {
    return (
        <LinkPanel
            className={style.lenkePanel}
            href={props.to}
            border
            as={(p: LinkPanelProps) => (
                <RouterLink to={props.to} {...p}>
                    {p.children}
                </RouterLink>
            )}
            onClick={() =>
                logLinkClick(props.to, props.tittel, 'tilbakemelding')
            }
        >
            {props.icon && (
                <img className={style.ikon} src={props.icon} alt="" />
            )}
            <div>
                <LinkPanel.Title> {props.tittel}</LinkPanel.Title>
            </div>
        </LinkPanel>
    );
};

export default Lenkepanel;
