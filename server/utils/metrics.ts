import type { RequestHandler } from 'express';
import { Counter, register } from '@prometheus-io/client';

// The kinds of feedback /mottak/:path accepts
const feedbackTypes = ['serviceklage', 'feil-og-mangler', 'ros'] as const;
const results = ['success', 'failure'] as const;

const isFeedbackType = (path: unknown): path is (typeof feedbackTypes)[number] =>
	typeof path === 'string' && (feedbackTypes as readonly string[]).includes(path);

const submissions = new Counter({
	name: 'tilbakemeldinger_submissions_total',
	help: 'Feedback submitted, by type. result is success when tilbakemeldingsmottak-api accepted it (2xx)',
	labelNames: ['type', 'result'] as const,
});

// Every series exists from startup, so rates and alerts work before the first submission
for (const type of feedbackTypes) {
	for (const result of results) {
		submissions.inc({ type, result }, 0);
	}
}

// Goes before the rate limiters, so submissions they reject count as failures too.
// Unknown paths aren't counted, which keeps the label values to a fixed set.
export const countSubmission: RequestHandler = (req, res, next) => {
	const type = req.params.path;
	if (isFeedbackType(type)) {
		res.on('finish', () => {
			submissions.inc({ type, result: res.statusCode < 300 ? 'success' : 'failure' });
		});
	}
	next();
};

export const metricsHandler: RequestHandler = async (req, res) => {
	res.set('Content-Type', register.contentType);
	res.send(await register.metrics());
};
