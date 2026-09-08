import { escapeHtml } from './escapeHtml.js';

describe('escapeHtml', () => {
	it('escapes html-sensitive characters', () => {
		expect(escapeHtml(`<img src="x" onerror='alert(1)'>&`)).toBe(
			'&lt;img src=&quot;x&quot; onerror=&#39;alert(1)&#39;&gt;&amp;'
		);
	});
});
