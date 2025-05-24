// app/layout.js
'use client';
import ClientLayoutRedirect from '@/components/common/ClientLayout';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import '../../styles/tailwind.css';

export default function MainLayout({ children }) {
  return (
    <>
      <ClientLayoutRedirect />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
