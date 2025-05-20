//layout cua toan web
//bo header footer vao day
'use client';
import { ToastProvider } from '@/context/toastContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../styles/tailwind.css';
export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
