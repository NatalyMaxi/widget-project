import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <main className={styles.page}>
      <div className={styles.loading}>
        Загрузка <span className={`${styles.dot} ${styles.dotOne}`}>.</span>
        <span className={`${styles.dot} ${styles.dotTwo}`}>.</span>
        <span className={`${styles.dot} ${styles.dotThree}`}>.</span>
      </div>
    </main>
  );
};
