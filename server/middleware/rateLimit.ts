import { MiddlewareHandler } from 'hono';
import { createHash } from 'crypto';

/*
 * Fixed-window limiter, per pod. Prod runs 2-4 replicas, so the effective limit
 * is this value times the replica count - acceptable for abuse protection, but
 * not a precise quota.
 *
 * Keys are derived from the *incoming* request only. The previous implementation
 * keyed on the exchanged access token, which for unauthenticated traffic was one
 * shared machine token - collapsing every anonymous user into a single bucket -
 * and additionally cost a live token exchange on every request.
 */

type Window = { count: number; resetAt: number };

const hash = (value: string) =>
    createHash('sha256').update(value).digest('base64url').slice(0, 24);

// X-Forwarded-For is set by the nais ingress; the left-most entry is the client.
// Express's req.ip was the socket address here (trust proxy was never enabled),
// which made the "per IP" limit global too.
export const clientKey = (c: {
    req: { header: (name: string) => string | undefined };
}) => {
    const auth = c.req.header('authorization');
    if (auth) return `u:${hash(auth)}`;

    const xff = c.req.header('x-forwarded-for');
    const ip = xff?.split(',')[0]?.trim();
    return `ip:${ip || 'unknown'}`;
};

export const rateLimit = ({
    windowMs,
    max,
    message,
}: {
    windowMs: number;
    max: number;
    message: string;
}): MiddlewareHandler => {
    const windows = new Map<string, Window>();

    // Drop expired windows so the map cannot grow without bound.
    const sweep = () => {
        const now = Date.now();
        for (const [key, w] of windows) {
            if (w.resetAt <= now) windows.delete(key);
        }
    };
    const timer = setInterval(sweep, windowMs);
    timer.unref();

    return async (c, next) => {
        const key = clientKey(c);
        const now = Date.now();
        const existing = windows.get(key);
        const window =
            existing && existing.resetAt > now
                ? existing
                : { count: 0, resetAt: now + windowMs };

        window.count += 1;
        windows.set(key, window);

        const remaining = Math.max(0, max - window.count);
        c.header('RateLimit-Limit', String(max));
        c.header('RateLimit-Remaining', String(remaining));
        c.header(
            'RateLimit-Reset',
            String(Math.ceil((window.resetAt - now) / 1000))
        );

        if (window.count > max) {
            return c.text(message, 429);
        }

        await next();
    };
};
