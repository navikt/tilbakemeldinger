import { paths, urls } from 'src/Config';
import heartIcon from 'assets/icons/line/line-version-logo-heart.svg';
import paperIcon from 'assets/icons/line/line-version-logo-paper.svg';
import complaintIcon from 'assets/icons/line/line-version-logo-complaint.svg';
import wrenchIcon from 'assets/icons/line/line-version-logo-wrench.svg';
import { Locale, localePath } from 'utils/locale';

export interface Lenke {
    tittel: string;
    beskrivelse: string;
    lenke: string;
    icon?: string;
    external?: boolean;
}

export const lenker = (locale: Locale): Lenke[] => [
    {
        icon: paperIcon,
        tittel: 'tilbakemeldinger.klageanke.tittel',
        beskrivelse: 'tilbakemeldinger.klageanke.beskrivelse',
        lenke: urls.tilbakemeldinger.klagepavedtak[locale],
        external: true,
    },
    {
        icon: complaintIcon,
        tittel: 'tilbakemeldinger.serviceklage.tittel',
        beskrivelse: 'tilbakemeldinger.serviceklage.beskrivelse',
        lenke: localePath(paths.tilbakemeldinger.serviceklage.form, locale),
    },
    {
        icon: wrenchIcon,
        tittel: 'tilbakemeldinger.feilogmangler.tittel',
        beskrivelse: 'tilbakemeldinger.feilogmangler.beskrivelse',
        lenke: localePath(paths.tilbakemeldinger.feilogmangler, locale),
    },
    {
        icon: heartIcon,
        tittel: 'tilbakemeldinger.ros.tittel',
        beskrivelse: 'tilbakemeldinger.ros.beskrivelse',
        lenke: localePath(paths.tilbakemeldinger.rostilnav, locale),
    },
];
