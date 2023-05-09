import React from 'react';
import { Heading } from '@navikt/ds-react';

interface Props {
    title?: string;
}

const Header = (props: Props) => (
    <div className="header">
        {props.title && (
            <Heading size={'large'} level={'1'} className="header__tittel">
                {props.title}
            </Heading>
        )}
    </div>
);

export default Header;
