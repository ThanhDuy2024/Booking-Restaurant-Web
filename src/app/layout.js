'use client';

import ReduxProvider from '@/redux/provider';
import { ToastProvider } from '@/context/toastContext';
import { ThemeProvider } from '@mui/material';
import theme from '@/lib/theme';
import '@/styles/tailwind.css';
import '@/styles/globals.css';
import '@/styles/variable.css';
import { useDispatch } from 'react-redux';
import { checkAuthRequest } from '@/redux/slices/authSlice';
import { useEffect } from 'react';
import ClientLayoutRedirect from '@/components/common/ClientLayout';
import AuthCheck from '@/components/common/AuthCheck';

export default function RootLayout({ children }) {

  return (
    <html lang="vi">
    <body>
    <ThemeProvider theme={theme}>
      <ReduxProvider>
        <ToastProvider>
          {/*<AuthCheck />*/}
          {/*<ClientLayoutRedirect />*/}
          {children}
        </ToastProvider>
      </ReduxProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
