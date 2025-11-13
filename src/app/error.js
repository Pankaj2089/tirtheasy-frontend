'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // ✅ Log full error details in development
    console.error('🔥 Error caught by custom error boundary:', error);

    // ✅ Optionally log to external services (e.g., Sentry, Logtail, etc.)
    // Sentry.captureException(error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Something went wrong!</h2>
      {process.env.NODE_ENV === 'development' && (
        <pre style={{ color: 'red', marginTop: '1rem' }}>
          {error?.message}
        </pre>
      )}
      <button
        onClick={() => {
          console.log('🔄 Retrying after error...');
          reset();
        }}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}