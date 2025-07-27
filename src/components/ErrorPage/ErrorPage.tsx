import { Button } from '@/components';
import { GENERAL_PAGE_ERROR } from '@/constants/errors';

import styles from './ErrorPage.module.scss';

interface IErrorPageProps {
  errorMessage?: string;
  onRetry: () => void;
  onReloadPage: () => void;
}

export const ErrorPage = ({ errorMessage, onRetry, onReloadPage }: IErrorPageProps) => {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Произошла ошибка!</h1>

      <p className={styles.errorText}>{errorMessage ?? GENERAL_PAGE_ERROR}</p>

      <div className={styles.container}>
        <Button text="Повторить загрузку" onClick={onRetry} aria-label="Повторить загрузку"></Button>
        <Button text="Перезагрузить страницу" onClick={onReloadPage} aria-label="Перезагрузить страницу"></Button>
      </div>
    </main>
  );
};
