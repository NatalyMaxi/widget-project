import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text: string;
}

export const Button = ({ text, className, ...props }: IButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      <span className={styles.text}>{text}</span>
    </button>
  );
};
