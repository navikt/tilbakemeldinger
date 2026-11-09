import React from 'react';
import { paths } from '#shared/paths.ts';
import { FormattedMessage } from 'react-intl';
import { Heading, Link } from '@navikt/ds-react';
import style from './404.module.scss';

// Its <head> (noindex) comes from the server, see notFoundHead
const NotFound = () => (
	<div className={style.container}>
		<Heading size={'medium'} level={'2'}>
			<FormattedMessage id={'feil.404'} />
		</Heading>
		<Link href={paths.kontaktOss.forside}>
			<FormattedMessage id={'feil.lenke'} />
		</Link>
	</div>
);

export default NotFound;
