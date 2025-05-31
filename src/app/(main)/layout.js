// app/layout.js
'use client';
import ClientLayoutRedirect from '@/components/common/ClientLayout';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import '../../styles/tailwind.css';
import HomePages from './page';
import MenuPage from './menu/page';
import LocationPage from './location/page';
import NewsPage from './news/page';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
