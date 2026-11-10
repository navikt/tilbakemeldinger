import { defineConfig } from 'oxlint';

export default defineConfig({
	plugins: ['typescript', 'unicorn', 'oxc', 'react', 'jsx-a11y', 'vitest', 'promise'],
	categories: { correctness: 'error', suspicious: 'error', perf: 'error' },
	options: { reportUnusedDisableDirectives: 'warn', typeAware: true },
	rules: {
		'typescript/no-explicit-any': 'error',
		// Under pedantic, and react/hooks misses hooks called from plain functions
		'react/rules-of-hooks': 'error',
		// It would flag the leading _ that marks a variable as unused
		'no-underscore-dangle': 'off',
		// The automatic JSX runtime needs no React in scope
		'react/react-in-jsx-scope': 'off',
		// Test helpers stay next to the tests that use them
		'unicorn/consistent-function-scoping': 'off',
		// The implementations give the mocks their types
		'vitest/require-mock-type-parameters': 'off',
		// It would flag every deliberate cast, like document.activeElement as HTMLElement
		'typescript/no-unsafe-type-assertion': 'off',
		// toSorted() needs Chrome 110, and @navikt/browserslist-config goes back to Chrome 108
		'unicorn/no-array-sort': 'off',
		// A React Compiler rule (react-hook-form's watch()), and we don't use the compiler
		'react/incompatible-library': 'off',
	},
});
