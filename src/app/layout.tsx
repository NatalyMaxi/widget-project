import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '@/styles/globals.scss';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'Widget project',
  description: 'Real-time Widget Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.variable}>{children}</body>
    </html>
  );
}
