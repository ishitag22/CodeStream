
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/spinner';

export default function Page() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const isSuccessful = status === 'success';

  useEffect(() => {
    if (window.opener) {
      // Send message to parent window
      window.opener.postMessage(
        {
          type: 'github-oauth',
          success: isSuccessful,
        },
        '*',
      );
    }
  }, [isSuccessful]);

  return (
    <main className="fixed left-0 top-0 flex size-full items-center justify-center p-2">
      <Alert className="bg-background/50 flex max-w-md gap-x-2 backdrop-blur">
        <Spinner className="size-6" />
        <div>
          <AlertTitle>Processing authentication...</AlertTitle>
          <AlertDescription>
            This window will close automatically in a few seconds.
          </AlertDescription>
        </div>
      </Alert>
    </main>
  );
}
