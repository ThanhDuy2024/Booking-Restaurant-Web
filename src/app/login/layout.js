// app/layout.js
import '@/styles/globals.css';
import ReduxProvider from '@/redux/provider';
import { ToastProvider } from '@/context/toastContext';
import ClientLayoutRedirect from '@/components/common/ClientLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
    <body>
    <ReduxProvider>
      <ToastProvider>
        <ClientLayoutRedirect />
        <main>{children}</main>
      </ToastProvider>
    </ReduxProvider>
    </body>
    </html>
  );
}
