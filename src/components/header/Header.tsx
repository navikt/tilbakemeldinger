import React from 'react';
import { Heading } from '@navikt/ds-react';

interface Props {
    title?: string;
}

const Header = (props: Props) => (
    <div className="header">
        {props.title && (
            <Heading align="center" size="large" level="1">
                {props.title}
            </Heading>
        )}
    </div>
);

export default Header;
