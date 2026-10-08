import type { Context, Handler } from 'hono';
import { createMiddleware } from 'hono/factory';
import { Counter, register } from '@prometheus-io/client';
import type { AppEnv } from '#server/types.ts';

// The kinds of feedback /mottak/:path accepts
const feedbackTypes = ['serviceklage', 'feil-og-mangler', 'ros'] as const;
const failureReasons = ['validation', 'rate_limit', 'auth', 'upstream', 'internal', 'unknown'] as const;
export type FailureReason = (typeof failureReasons)[number];

const isFeedbackType = (path: unknown): path is (typeof feedbackTypes)[number] =>
	typeof path === 'string' && (feedbackTypes as readonly string[]).includes(path);

const submissions = new Counter({
	name: 'tilbakemeldinger_submissions_total',
	help: 'Feedback submitted, by type. result is success when tilbakemeldingsmottak-api accepted it (2xx). reason says why a submission failed, and is none on success',
	labelNames: ['type', 'result', 'reason'] as const,
});

// Every series exists from startup, so rates and alerts work before the first submission
for (const type of feedbackTypes) {
	submissions.inc({ type, result: 'success', reason: 'none' }, 0);
	for (const reason of failureReasons) {
		submissions.inc({ type, result: 'failure', reason }, 0);
	}
}

// Handlers call this before sending a failure response, so the metric can tell failures apart
export const setFailureReason = (c: Context<AppEnv>, reason: FailureReason) => {
	c.set('failureReason', reason);
};

const reasonFor = (c: Context<AppEnv>): FailureReason => {
	const reason = c.get('failureReason');
	if (reason) {
		return reason;
	}
	// Rate limiters reply on their own, without going through the handler
	return c.res.status === 429 ? 'rate_limit' : 'unknown';
};

// Goes before the rate limiters, so submissions they reject count as failures too.
// Unknown paths aren't counted, which keeps the label values to a fixed set.
export const countSubmission = createMiddleware<AppEnv>(async (c, next) => {
	await next();

	const type = c.req.param('path');
	if (isFeedbackType(type)) {
		if (c.res.status < 300) {
			submissions.inc({ type, result: 'success', reason: 'none' });
		} else {
			submissions.inc({ type, result: 'failure', reason: reasonFor(c) });
		}
	}
});

export const metricsHandler: Handler = async (c) => {
	return c.body(await register.metrics(), 200, { 'Content-Type': register.contentType });
};
