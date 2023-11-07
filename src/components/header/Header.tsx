import React from 'react';
import { Heading } from '@navikt/ds-react';

interface Props {
    title?: string;
}

const Header = ({ title }: Props) =>
    title ? (
        <Heading align="center" size="large" level="1" spacing>
            {title}
        </Heading>
    ) : null;

export default Header;
