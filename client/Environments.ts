import { getConfig } from '#client/appConfig.ts';
import { BASE_PATH } from '#shared/paths.ts';

// The URLs the app uses, from what the server told it (.nais/config.yml in a pod, .env.development locally)
const Environment = () => {
	const { origin, authUrl, loginUrl } = getConfig();

	return {
		baseUrl: origin,
		appUrl: `${origin}${BASE_PATH}/tilbakemeldinger`,
		personInfoApiUrl: `${origin}/tms-personopplysninger-api`,
		authUrl,
		loginUrl,
	};
};

export default Environment;
