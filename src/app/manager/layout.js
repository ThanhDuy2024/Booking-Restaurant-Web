'use client';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/toastContext';

export default function ManagerLayout({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen flex">
          <aside className="w-64 bg-gray-900 text-white p-4">
            Sidebar dashboard
          </aside>
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}