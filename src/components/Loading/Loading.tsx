import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.wrapper}>
        Загрузка <span className={`${styles.dot} ${styles.dotOne}`}>.</span>
        <span className={`${styles.dot} ${styles.dotTwo}`}>.</span>
        <span className={`${styles.dot} ${styles.dotThree}`}>.</span>
      </div>
    </div>
  );
};
