import { paths } from 'common/paths';
import { localePath } from 'utils/locale';
import { Locale } from 'common/locale';

export interface Lenke {
    tittel: string;
    lenke: string;
    icon?: string;
    external?: boolean;
}

export const lenker = (locale: Locale): Lenke[] => [
    {
        tittel: 'tilbakemeldinger.serviceklage.tittel',
        lenke: localePath(paths.tilbakemeldinger.serviceklage.form, locale),
    },
    {
        tittel: 'tilbakemeldinger.feil-og-mangler.sidetittel',
        lenke: localePath(paths.tilbakemeldinger.feilogmangler, locale),
    },
    {
        tittel: 'tilbakemeldinger.ros-til-nav.sidetittel',
        lenke: localePath(paths.tilbakemeldinger.rostilnav, locale),
    },
];
