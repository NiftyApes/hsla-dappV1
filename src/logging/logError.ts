import * as Sentry from '@sentry/react';

export function logError(err: any) {
  console.error(err, JSON.stringify(err));
  if (err instanceof Error) {
    Sentry.captureException(err);
  } else {
    Sentry.captureMessage(JSON.stringify(err));
  }
}
