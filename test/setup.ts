import '@testing-library/jest-dom/vitest';
import { setConfig } from '#client/appConfig.ts';
import type { AppConfig } from '#shared/types/appConfig.ts';

// The app is handed its config before it renders (client/main-client.tsx), so the tests that render it hand it
// one too. The values are pinned in vite.config.ts (test.env)
setConfig({
	env: process.env.ENV as AppConfig['env'],
	origin: process.env.APP_ORIGIN as string,
	telemetryUrl: process.env.TELEMETRY_URL,
});

// The decorator client re-posts "ready" every 50 ms until the decorator answers.
// No decorator runs in tests, so the timer would outlive the jsdom environment
// and crash with "window is not defined". Answer it like the decorator does.
if (typeof window !== 'undefined') {
	window.addEventListener('message', (msg) => {
		if (msg.data?.source !== 'decoratorClient' || msg.data?.event !== 'ready') return;
		window.dispatchEvent(
			new MessageEvent('message', {
				data: { source: 'decorator', event: 'ready' },
				origin: window.location.origin,
				source: window,
			})
		);
	});
}
