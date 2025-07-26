import { WidgetGrid } from '@/components';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.page}>
      <WidgetGrid />
    </main>
  );
}
