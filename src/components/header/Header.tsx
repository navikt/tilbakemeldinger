import React from 'react';
import { Heading } from '@navikt/ds-react';

interface Props {
    title?: string;
}

const Header = (props: Props) => (
    <>
        {props.title && (
            <Heading align="center" size="large" level="1" spacing>
                {props.title}
            </Heading>
        )}
    </>
);

export default Header;
