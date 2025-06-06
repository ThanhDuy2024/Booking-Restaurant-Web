'use client';

import ReduxProvider from '@/redux/provider';
import { ToastProvider } from '@/context/toastContext';
import { ThemeProvider } from '@mui/material';
import theme from '@/lib/theme';
import '@/styles/tailwind.css';
import '@/styles/globals.css';
import '@/styles/variable.css';
import ModalRender from '@/components/ModalRender';


export default function RootLayout({ children }) {

  return (
    <html lang="vi">
    <body>
    <ThemeProvider theme={theme}>
      <ReduxProvider>
        <ToastProvider>
          <ModalRender />
          {children}
        </ToastProvider>
      </ReduxProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
