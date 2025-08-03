'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showNavbar = mounted && pathname !== '/auth' && pathname !== '/signup' && pathname !== '/' && pathname !== '/forgot-password';

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
