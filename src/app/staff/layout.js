'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '@/components/staff/sideBar';
import { Menu } from 'lucide-react';
import { checkAuthRequest } from '@/redux/slices/authSlice';
import Image from 'next/image';


export default function StaffLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'staff') {
      router.push('/error');
    }
  }, [user]);

  if (!user || user.role !== 'staff') return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full bg-background text-title font-title text-black p-4 flex justify-between items-center shadow-md">
        <button onClick={() => setIsOpen(true)} className="md:block">
          <Menu size={28} />
        </button>
        <h1 className="">
          <Image
            src={'/images/logo.webp'}
            alt="Logo"
            width={150}
            height={50}
          />

        </h1>
      </header>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="p-6">{children}</main>
    </div>
  );
}