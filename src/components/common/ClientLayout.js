'use client';

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ClientLayoutRedirect() {
  const user = useSelector((state) => state.auth.user);
  const pathname = usePathname();
  const router = useRouter();

  console.log('🔍 [LayoutRedirect] user.role =', user?.role, '| pathname =', pathname);

  useEffect(() => {
    if (!user) return;

    const publicPages = ['/', '/login'];
    if (!publicPages.includes(pathname)) return;
    console.log('user Role = ' + user.role)

    if (user.role === 'admin' && pathname !== '/manager') {
      router.push('/manager');
    } else if (user.role === 'staff' && pathname !== '/staff') {
      router.push('/staff');
    }
  }, [user, pathname, router]);

  return null;
}