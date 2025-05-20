'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ClientLayoutRedirect() {
  const user = useSelector((state) => state.auth.user);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user && (pathname === '/' || pathname === '/login')) {
      switch (user.role) {
        case 'ADMIN':
          router.push('/manager');
          break;
        case 'STAFF':
          router.push('/staff');
          break;
        default:
          router.push('/');
      }
    }
  }, [user, pathname]);

  return null;
}
