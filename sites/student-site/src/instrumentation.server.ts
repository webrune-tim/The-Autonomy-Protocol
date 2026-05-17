import * as Sentry from "@sentry/sveltekit";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  release: process.env.SENTRY_RELEASE,

  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  enableLogs: true,
});
