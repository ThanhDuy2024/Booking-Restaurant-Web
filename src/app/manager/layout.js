'use client';
import '@/styles/tailwind.css';
import '@/styles/globals.css';
import { ToastProvider } from '@/context/toastContext';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import ReduxProvider from '@/redux/provider';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ManagerLayout({ children }) {
  // const user = useSelector((state) => state.auth.user);
  // const router = useRouter();
  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   } else if (user.role !== 'ADMIN') {
  //     router.push('/error');
  //   }
  // }, [user]);
  //
  // if (!user || user.role !== 'ADMIN') return null;

  return (
    <html lang="vi">
    <body>
    <ReduxProvider>
      <ToastProvider>
        <div className="min-h-screen w-screen flex flex-row ">
          <aside className="min-w-[15%] max-w-[15%] lg:min-w-[20%] lg:max-w-[20%] hidden sm:block bg-[var(--background)] text-white">
            {/*header here*/}
            <div className={'bg-[var(--heading)]'}>
              <div className={'p-4 text-center font-bold text-xl'}>ARENA OF VALOR</div>
            </div>

            {/*menu here*/}
            <div className={'flex flex-col justify-center items-center'}>
              <ul className="w-full h-full">
                <li className={'px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)]'}>
                  <Link href={'/manager'}>Trang chủ</Link>
                </li>
                <li className={'px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)]'}>
                  <Link href={'/manager/branch_manager'}>Chi nhánh</Link>
                </li>
                <li className={'px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)]'}>
                  <Link href={'/manager/finance_manager'}>Doanh thu</Link>
                </li>
                <li className={'px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)]'}>
                  <Link href={'/manager/food_manager'}>Thực đơn</Link>
                </li>
                <li className={'px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)]'}>
                  <Link href={'/manager/user_manager'}>Người dùng</Link>
                </li>
                <li className={'px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)]'}>
                  <Link href={'/manager/setting'}>Cài đặt</Link>
                </li>
              </ul>
            </div>
          </aside>
          <main className="flex-1 bg-gray-100 sm:min-w-[85%] sm:max-w-[85%] lg:min-w-[80%] lg:max-w-[80%] h-full">{children}</main>
        </div>
      </ToastProvider>
    </ReduxProvider>
    </body>
    </html>
  );
}
