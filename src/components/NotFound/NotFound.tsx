import Link from 'next/link';

import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.text}>Возможно, вы перешли по неверной ссылке или страница была удалена.</p>

      <Link href="/" className={styles.link}>
        Перейти на главную страницу
      </Link>
    </main>
  );
};
