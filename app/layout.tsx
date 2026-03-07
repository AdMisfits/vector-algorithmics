import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vector Algorithmics | Automated Trading That Profits in Any Market',
  description:
    'Market-neutral trading systems that profit from volatility—capturing gains whether markets rise or fall. No leverage. No offshore brokers. U.S. regulated execution.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
