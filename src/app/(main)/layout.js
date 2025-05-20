// app/layout.js
import '@/styles/globals.css';
import ReduxProvider from '@/redux/provider';
import { ToastProvider } from '@/context/toastContext';
import ClientLayoutRedirect from '@/components/ClientLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
    <body>
    <ReduxProvider>
      <ToastProvider>
        <ClientLayoutRedirect />
        <header className="text-red-400">Header người dùng</header>
        <main>{children}</main>
        <footer>Footer người dùng</footer>
      </ToastProvider>
    </ReduxProvider>
    </body>
    </html>
  );
}
