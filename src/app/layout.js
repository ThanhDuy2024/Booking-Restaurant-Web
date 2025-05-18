//layout cua toan web
//bo header footer vao day
'use client'
import { ToastProvider } from '@/context/toastContext';

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
    <body>
    <ToastProvider>
      <header>Header người dùng</header>
      <main>{children}</main>
      <footer>Footer người dùng</footer>
    </ToastProvider>
    </body>
    </html>
  );
}
