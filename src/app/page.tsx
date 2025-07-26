import { ReduxProvider } from '@/components/ReduxProvider';
import { WidgetGrid } from '@/components';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.page}>
      <ReduxProvider>
        <WidgetGrid />
      </ReduxProvider>
    </main>
  );
}
