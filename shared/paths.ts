// Where the app is served: its routes and its links start here, in every environment
export const BASE_PATH = '/person/kontakt-oss';

export const paths = {
	kontaktOss: {
		forside: BASE_PATH,
	},
	tilbakemeldinger: {
		serviceklage: {
			form: '/tilbakemeldinger/serviceklage',
		},
		feilogmangler: '/tilbakemeldinger/feil-og-mangler',
		rostilnav: '/tilbakemeldinger/ros-til-nav',
	},
};
