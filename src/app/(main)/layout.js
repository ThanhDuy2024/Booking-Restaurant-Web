// app/layout.js
import '@/styles/globals.css';
import ReduxProvider from '@/redux/provider';
import { ToastProvider } from '@/context/toastContext';
import ClientLayoutRedirect from '@/components/common/ClientLayout';
import { ThemeProvider } from '@mui/material';
import theme from '@/lib/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
    <body>
    <ThemeProvider theme={theme}>
      <ReduxProvider>
        <ToastProvider>
          <ClientLayoutRedirect />
          <header className="text-red-400">Header người dùng</header>
          <main>{children}</main>
          <footer>Footer người dùng</footer>
        </ToastProvider>
      </ReduxProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
