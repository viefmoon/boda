import type { Metadata } from 'next';
import { Lato, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'La Boda de Sofia y Oswaldo',
  description:
    'Únete a nosotros para celebrar la unión de Sofia y Oswaldo. Descubre nuestra historia de amor, detalles de la boda y más.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${lato.variable} ${cormorant.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
