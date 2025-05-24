// app/layout.js

import '@/styles/globals.css';
import ClientLayoutRedirect from '@/components/common/ClientLayout';

export default function RootLayout({ children }) {
  return (
    <>
      <ClientLayoutRedirect />
      <main>{children}</main>
    </>
  );
}
