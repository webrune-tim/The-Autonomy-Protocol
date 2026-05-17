import * as Sentry from "@sentry/sveltekit";

Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN ?? import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,

  sendDefaultPii: true,
  tracesSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
});

export const handleError = Sentry.handleErrorWithSentry();
