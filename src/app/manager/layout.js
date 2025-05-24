'use client';


import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ManagerLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'admin') {
      router.push('/error');
    }
  }, [user]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen w-screen relative">
      <aside className="w-64 hidden absolute bg-gray-900 text-white p-4">
        Sidebar dashboard
      </aside>
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
}
