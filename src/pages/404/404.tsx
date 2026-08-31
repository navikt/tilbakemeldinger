import { useEffect } from 'react';
import { paths } from 'common/paths';
import { FormattedMessage } from 'react-intl';
import { Heading, Link } from '@navikt/ds-react';
import { useStore } from 'providers/Provider';
import { addNoindex, applyDocumentMetadata } from 'src/utils/documentMetadata';
import { fallbackMetadata } from 'common/metadata';
import style from './404.module.scss';

const NotFound = () => {
    const [{ locale }] = useStore();

    // Reached in-app as well as on load, and the page navigated away from left
    // its title and canonical behind. The fallback carries neither a
    // description nor a canonical, so applying it clears them.
    useEffect(() => {
        applyDocumentMetadata(fallbackMetadata(locale));
    }, [locale]);

    // Client-side only, as before: this route is also what an unlocalised URL
    // renders for the instant before it redirects, so a noindex written during
    // SSR would outlive the page it applies to.
    useEffect(addNoindex, []);

    return (
        <div className={style.container}>
            <Heading size={'medium'} level={'2'}>
                <FormattedMessage id={'feil.404'} />
            </Heading>
            <Link href={paths.kontaktOss.forside}>
                <FormattedMessage id={'feil.lenke'} />
            </Link>
        </div>
    );
};

export default NotFound;
