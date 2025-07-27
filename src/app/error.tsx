'use client';

import { useEffect } from 'react';

import { ErrorPage } from '@/components';
import { GENERAL_ERROR_LOG } from '@/constants/errors';
import { reloadPage } from '@/utils/reloadPage';

interface IErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: IErrorProps) {
  useEffect(() => {
    console.error(GENERAL_ERROR_LOG, error);
  }, [error]);

  return <ErrorPage errorMessage={error.message} onRetry={reset} onReloadPage={reloadPage} />;
}
