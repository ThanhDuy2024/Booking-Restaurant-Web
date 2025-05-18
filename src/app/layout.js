//layout cua toan web
//bo header footer vao day
'use client'
import { ToastProvider } from '@/context/toastContext'
import '@/styles/tailwind.css'
import '@/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
    <body>
    <ToastProvider>
      <header className={`text-red-400`}>Header người dùng</header>
      <main>{children}</main>
      <footer>Footer người dùng</footer>
    </ToastProvider>
    </body>
    </html>
  );
}
