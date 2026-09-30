import "server-only";

/**
 * Spam protection. Layers:
 *  1. Honeypot field (bots fill hidden inputs)
 *  2. Minimum fill time (bots submit instantly)
 *  3. Cloudflare Turnstile, only when TURNSTILE_SECRET_KEY is set
 * A rate limiter (e.g. Upstash, Vercel KV) can be added in checkSpam later.
 */

const MIN_FILL_MS = 2500;

export type SpamResult = { ok: true } | { ok: false; reason: "honeypot" | "too-fast" | "turnstile" };

export async function checkSpam(opts: {
  hp: string;
  startedAt: number;
  turnstileToken?: string;
  ip?: string | null;
}): Promise<SpamResult> {
  if (opts.hp) return { ok: false, reason: "honeypot" };
  if (!opts.startedAt || Date.now() - opts.startedAt < MIN_FILL_MS) return { ok: false, reason: "too-fast" };

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    if (!opts.turnstileToken) return { ok: false, reason: "turnstile" };
    const body = new URLSearchParams({ secret, response: opts.turnstileToken });
    if (opts.ip) body.set("remoteip", opts.ip);
    try {
      const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body,
      });
      const data = (await res.json()) as { success?: boolean };
      if (!data.success) return { ok: false, reason: "turnstile" };
    } catch {
      return { ok: false, reason: "turnstile" };
    }
  }
  return { ok: true };
}
