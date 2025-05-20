'use client';
import '@/styles/tailwind.css';
import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/toastContext';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import ReduxProvider from '@/redux/provider';

export default function ManagerLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'ADMIN') {
      router.push('/error');
    }
  }, [user]);

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <ReduxProvider>
      <ToastProvider>
        <div className="min-h-screen flex">
          <aside className="w-64 bg-gray-900 text-white p-4">
            Sidebar dashboard
          </aside>
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </ToastProvider>
    </ReduxProvider>
  );
}