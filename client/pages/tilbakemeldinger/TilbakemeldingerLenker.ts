import { paths } from '#shared/paths.ts';
import { localePath } from 'utils/locale';
import { Locale } from '#shared/locale.ts';

export interface Lenke {
	tittel: string;
	lenke: string;
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
