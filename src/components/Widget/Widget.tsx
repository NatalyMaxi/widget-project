'use client';

import { memo, useEffect, useState, useRef } from 'react';

import { useAppSelector } from '@/store/store';
import { selectWidgetValueById } from '@/store/widgetsSlice';

import { getValueColorClass } from '@/utils/valueColor';
import { THRESHOLDS } from '@/constants/shared';

import styles from './Widget.module.scss';

interface IWidgetProps {
  name: string;
  id: number;
}

export const Widget = memo(
  ({ name, id }: IWidgetProps) => {
    const value = useAppSelector(selectWidgetValueById(id));

    const prevValueRef = useRef<number | undefined>(undefined);

    const [justUpdated, setJustUpdated] = useState(false);

    useEffect(() => {
      if (prevValueRef.current !== undefined && prevValueRef.current !== value) {
        setJustUpdated(true);
        const timeout = setTimeout(() => setJustUpdated(false), 1000);
        return () => clearTimeout(timeout);
      }
      prevValueRef.current = value;
    }, [value]);

    const widgetClass = getValueColorClass(value, THRESHOLDS, {
      default: styles.widget,
      positive: styles.positive,
      negative: styles.negative,
    });

    // Эта консоль отображает, что перерисуются только виджеты у которых изменилось значение и они находятся в DOM.

    //console.log(`render Widget ${id}`);

    return (
      <div className={`${widgetClass} ${justUpdated ? styles.pulse : ''}`}>
        <span className={styles.widgetName}>{name}</span>
        <span className={styles.widgetValue}>{value}</span>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.id === nextProps.id && prevProps.name === nextProps.name,
);

Widget.displayName = 'Widget';
