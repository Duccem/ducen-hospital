import '@/assets/globals.css';
import ToastProvider from '@/libs/ducen-ui/components/toast-provider';
import { ApolloContextProvider } from '@/modules/shared/infrastructure/persistence/graphql/apollo-provider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Toaster } from 'sonner';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Helsa',
  description: 'A platform for managing your health',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ApolloContextProvider>
        <html lang="en">
          <link rel="icon" href="/images/logo-simple.png" sizes="any" />
          <body className={nunito.className} suppressHydrationWarning={true}>
            {children}
            <ToastProvider></ToastProvider>
            <Toaster />
          </body>
        </html>
      </ApolloContextProvider>
    </ClerkProvider>
  );
}
