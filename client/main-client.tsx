// Vite adds these to an HTML entry by itself. Here the server writes the page (server/site/page.ts).
// The preamble sets up React Fast Refresh in development, and is empty in builds
import '@vitejs/plugin-react/preamble';
import 'vite/modulepreload-polyfill';
// Import global style early to ensure the later component-level imports
// gets higher specificity
import './App.scss';

import { StrictMode } from 'react';
import { createRoot, hydrateRoot, type ErrorInfo } from 'react-dom/client';
import { captureException, loadApm } from '#client/utils/apm.ts';
import { AppRoot } from './index';

// Before React renders, so it loads while the page hydrates. Errors reported before it has loaded wait for it
loadApm();

// Errors React recovers from (after a hydration mismatch it renders on the client instead), and errors caught by an
// error boundary. Uncaught errors keep React's default: it reports them as global errors, which APM already picks up
// (window.onerror), so forwarding them as well would report them twice
const reportTo =
	(fingerprint: string) =>
	(error: unknown, { componentStack }: ErrorInfo) => {
		captureException(error, { fingerprint, context: { componentStack } });
		// Still in the console, where React's default handlers print them. As a warning: APM reports every console.error
		console.warn(error);
	};

const options = {
	onRecoverableError: reportTo('root.recoverable-error'),
	onCaughtError: reportTo('root.caught-error'),
};

const rootElement = document.getElementById('maincontent') as HTMLElement;
const app = (
	<StrictMode>
		<AppRoot />
	</StrictMode>
);

// Hydrate only when the server rendered the app (an element, not just whitespace or nothing)
if (rootElement.firstElementChild) {
	hydrateRoot(rootElement, app, options);
} else {
	console.log('Rendering!');
	createRoot(rootElement, options).render(app);
}
