import { urls } from 'src/Config';
import { paths } from 'common/paths';
import heartIcon from 'assets/icons/line/line-version-logo-heart.svg';
import paperIcon from 'assets/icons/line/line-version-logo-paper.svg';
import complaintIcon from 'assets/icons/line/line-version-logo-complaint.svg';
import wrenchIcon from 'assets/icons/line/line-version-logo-wrench.svg';
import { localePath } from 'utils/locale';
import { Locale } from 'common/locale';

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
        tittel: 'tilbakemeldinger.feil-og-mangler.sidetittel',
        beskrivelse: 'tilbakemeldinger.feilogmangler.beskrivelse',
        lenke: localePath(paths.tilbakemeldinger.feilogmangler, locale),
    },
    {
        icon: heartIcon,
        tittel: 'tilbakemeldinger.ros-til-nav.sidetittel',
        beskrivelse: 'tilbakemeldinger.ros.beskrivelse',
        lenke: localePath(paths.tilbakemeldinger.rostilnav, locale),
    },
];
