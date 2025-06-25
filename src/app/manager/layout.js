'use client';


import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { checkAuthRequest } from '@/redux/slices/authSlice';
import { BsBell, BsBellFill, BsQuestionCircle, BsQuestionCircleFill, BsXCircle } from 'react-icons/bs';

export default function ManagerLayout({ children }) {
  const [currentTab, setCurrentTab] = useState(-1);
  const [activeTab, setActiveTab] = useState(Array(8).fill(false));

  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const activeCurrTab = (index) => {
    setActiveTab((prevState) => {
      const newContent = [...prevState];
      if (currentTab !== index) {
        setCurrentTab(index);
        newContent[currentTab] = !newContent[currentTab];
        newContent[index] = !newContent[index];
      }
      return newContent;
    });
  };

  useEffect(() => {
    dispatch(checkAuthRequest());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) return;

    if (!user) {
      router.push('/login');
    } else if (user.role !== 'admin') {
      router.push('/error');
    }
  }, [user, router]);

  useEffect(() => {
    setCurrentTab(0);
    setActiveTab(prev => {
      const temp = activeTab;
      temp[0] = true;
      return temp;
    });
  }, []);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen w-screen flex flex-row ">
      <aside
        className="min-w-[15%] max-w-[15%] lg:min-w-[20%] lg:max-w-[20%] hidden sm:block bg-[var(--background)] text-white border-r-2 border-[var(--border-card)]">
        {/*header here*/}
        <div className={'bg-[var(--heading)]'}>
          <div className={'p-4 text-center font-bold text-xl'}>ARENA OF VALOR</div>
        </div>

        {/*menu here*/}
        <div className={'flex flex-col justify-center items-center'}>
          <ul className="w-full h-full">
            <li
              className={`px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)] ${activeTab[0] ? `bg-[var(--heading)] text-white` : `bg-white text-text`}`}
              onClick={() => activeCurrTab(0)}>
              <Link href={'/manager'}>Trang chủ</Link>
            </li>
            <li
              className={`px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)] ${activeTab[1] ? `bg-[var(--heading)] text-white` : `bg-white text-text`} `}
              onClick={() => activeCurrTab(1)}>
              <Link href={'/manager/branch_manager'}>Chi nhánh</Link>
            </li>
            <li
              className={`px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)] ${activeTab[2] ? `bg-[var(--heading)] text-white` : `bg-white text-text`}`}
              onClick={() => activeCurrTab(2)}>
              <Link href={'/manager/finance_manager'}>Doanh thu</Link>
            </li>
            <li
              className={`px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)] ${activeTab[3] ? `bg-[var(--heading)] text-white` : `bg-white text-text`}`}
              onClick={() => activeCurrTab(3)}>
              <Link href={'/manager/category_manager'}>Danh mục</Link>
            </li>
            <li
              className={`px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)] ${activeTab[4] ? `bg-[var(--heading)] text-white` : `bg-white text-text`}`}
              onClick={() => activeCurrTab(4)}>
              <Link href={'/manager/food_manager'}>Thực đơn</Link>
            </li>
            <li
              className={`px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)] ${activeTab[5] ? `bg-[var(--heading)] text-white` : `bg-white text-text`}`}
              onClick={() => activeCurrTab(5)}>
              <Link href={'/manager/user_manager'}>Tài khoản</Link>
            </li>
            <li
              className={`px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)] ${activeTab[6] ? `bg-[var(--heading)] text-white` : `bg-white text-text`}`}
              onClick={() => activeCurrTab(6)}>
              <Link href={'/manager/setting'}>Hồ sơ</Link>
            </li>
            <li
              className={`px-2.5 py-2 font-bold border-b-2 border-[var( --border-card)] text-[var(--text-color)] ${activeTab[7] ? `bg-[var(--heading)] text-white` : `bg-white text-text`}`}
              onClick={() => activeCurrTab(7)}>
              <Link href={'/manager/'}>Đăng xuất</Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="flex flex-col w-full h-full">
        <header className="hidden min-w-full bg-[var(--heading)] p-3 sm:flex flex-row justify-between items-center">
          <div className="flex flex-row items-center jus-center text-red-500">
            <BsXCircle color={'#ef4444'} size={20} className={'mx-1'} />
            0 cảnh báo
          </div>
          <div className={'flex flex-row justify-center items-center'}>
            <BsQuestionCircleFill color={'white'} size={20} className={'mx-1'} />
            <div className={'relative w-fit mx-1'}>
              <BsBellFill color={'white'} size={20} className={'mx-1'} />
              <div className={'w-2.5 h-2.5 bg-red-400 rounded-full absolute bottom-0 right-0'}></div>
            </div>
          </div>
        </header>
        <main
          className="flex-1 bg-gray-100 w-full sm:min-w-[85%] h-full">{children}</main>
      </div>
    </div>
  );
}