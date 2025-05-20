// app/layout.js
'use client';
import ReduxProvider from '@/redux/provider';
import { ToastProvider } from '@/context/toastContext';
import ClientLayoutRedirect from '@/components/common/ClientLayout';
import { ThemeProvider } from '@mui/material';
import theme from '@/lib/theme';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import '../../styles/tailwind.css';

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <ThemeProvider theme={theme}>
          <ReduxProvider>
            <ToastProvider>
              <ClientLayoutRedirect />
              <Header />
              <main>{children}</main>
              <Footer />
            </ToastProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
