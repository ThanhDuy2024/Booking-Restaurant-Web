import ReduxProvider from '@/redux/provider';
import { ToastProvider } from '@/context/toastContext';
import { ThemeProvider } from '@mui/material';
import theme from '@/lib/theme';
import '@/styles/tailwind.css';
import '@/styles/globals.css';
import '@/styles/variable.css';
import 'tippy.js/dist/tippy.css';
import ModalRender from '@/components/ModalRender';
import LayoutWrapper from '@/components/common/layoutWrapper';


export default function RootLayout({ children }) {

  return (
    <html lang="vi">
    <body>
    <ThemeProvider theme={theme}>
      <ReduxProvider>
        <ToastProvider>
          <LayoutWrapper />
          <ModalRender />
          {children}
        </ToastProvider>
      </ReduxProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
