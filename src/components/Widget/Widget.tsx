import { memo } from 'react';

import { getValueColorClass } from '@/utils/valueColor';

import styles from './Widget.module.scss';

interface IWidgetProps {
  name: string;
  value: number;
}
const THRESHOLDS = { positive: 50, negative: -50 };

export const Widget = memo(
  ({ name, value }: IWidgetProps) => {
    const widgetClass = getValueColorClass(value, THRESHOLDS, {
      default: styles.widget,
      positive: styles.positive,
      negative: styles.negative,
    });

    return (
      <div className={widgetClass}>
        <span className={styles.widgetName}>{name}</span>
        <span className={styles.widgetValue}>{value}</span>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);

Widget.displayName = 'Widget';
