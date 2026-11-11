import type { CaptureExceptionOptions } from '@nais/apm';
import { getConfig } from '#client/appConfig.ts';

// @nais/apm (Grafana Faro) is one of the biggest parts of the bundle, and nothing on the page needs it to render,
// so it's loaded in its own chunk while the page hydrates

let apm: Promise<typeof import('@nais/apm')> | undefined;

// Called once, by main-client.tsx, so the server render and the tests never load it
export const loadApm = () => {
	apm ??= import('@nais/apm').then((module) => {
		module.init({
			namespace: 'navno',
			app: 'tilbakemeldinger',
			telemetryUrl: getConfig().telemetryUrl,
		});
		return module;
	});
};

// Sent once APM has loaded, so errors from before then aren't lost (@nais/apm drops captures before its init)
export const captureException = (exception: unknown, options?: CaptureExceptionOptions) => {
	void apm?.then((module) => module.captureException(exception, options));
};
