import React from 'react';
import { paths } from '../../Config';
import { FormattedMessage } from 'react-intl';
import { Heading, Link } from '@navikt/ds-react';
import { Helmet } from 'react-helmet-async';

const NotFound = () => (
    <>
        <Helmet>
            <meta name="robots" content="noindex" />
        </Helmet>
        <div className="notfound__container">
            <Heading size={'medium'} level={'2'}>
                <FormattedMessage id={'feil.404'} />
            </Heading>
            <Link href={paths.kontaktOss.forside}>
                <FormattedMessage id={'feil.lenke'} />
            </Link>
        </div>
    </>
);

export default NotFound;
