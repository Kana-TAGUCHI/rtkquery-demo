import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RTKQuery Demo App',
  description: 'Demonstration of RTK Query',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <main className='flex min-h-screen flex-col items-center p-20 max-w-[720px] mx-auto'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
