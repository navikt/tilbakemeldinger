import { execFileSync } from 'node:child_process';
import { BUILD_ENV, ROOT } from './harness';

/*
 * Builds the app once with a pinned env before the HTTP tests. Process env wins
 * over a local .env in vite.config.ts, so a developer's .env can't leak in.
 * This is why the HTTP tests must never run as part of `pnpm test`: CI deploys
 * run `test` between the real build and the CDN upload/Docker build.
 */
export default function setup() {
	if (process.env.HTTP_SKIP_BUILD === '1') {
		return;
	}

	try {
		execFileSync('pnpm', ['run', 'build'], {
			cwd: ROOT,
			env: { ...process.env, ...BUILD_ENV, pnpm_config_verify_deps_before_run: 'false' },
			stdio: 'pipe',
		});
	} catch (e) {
		const { stdout, stderr } = e as { stdout?: Buffer; stderr?: Buffer };
		throw new Error(`Build failed:\n${stdout?.toString() ?? ''}\n${stderr?.toString() ?? ''}`, { cause: e });
	}
}
