'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <nav className="navbar" style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🎉</span>
        <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Celebration Tracker</span>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/dashboard" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          📊 Dashboard
        </Link>
        <Link href="/add" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ➕ Add Celebration
        </Link>
        <button
          onClick={handleLogout}
          className="nav-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#dc3545',
            padding: '0.5rem 1rem',
            borderRadius: '4px'
          }}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}
