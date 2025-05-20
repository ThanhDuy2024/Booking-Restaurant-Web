// app/layout.js
import '@/styles/globals.css';
import ReduxProvider from '@/redux/provider';
import { ToastProvider } from '@/context/toastContext';
import ClientLayoutRedirect from '@/components/common/ClientLayout';
import '@/styles/tailwind.css';
import '@/styles/globals.css';
import '@/styles/variable.css';
import theme from '@/lib/theme';
import { ThemeProvider } from '@mui/material';

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
    <body>
    <ReduxProvider>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <ClientLayoutRedirect />
          <main>{children}</main>
        </ToastProvider>
      </ThemeProvider>
    </ReduxProvider>
    </body>
    </html>
  );
}
