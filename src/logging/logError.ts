import * as Sentry from '@sentry/react';

export function logError(err: any) {
  console.error(err, JSON.stringify(err));
  Sentry.captureException(err);
  Sentry.captureMessage(JSON.stringify(err));
}
