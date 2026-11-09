import '@testing-library/jest-dom/vitest';

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
