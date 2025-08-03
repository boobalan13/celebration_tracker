'use client';
import { useRouter } from 'next/navigation';
import CelebrationForm from '../../components/CelebrationForm';

export default function AddPage() {
  const router = useRouter();

  async function handleAdd(data) {
    try {
      const res = await fetch('/api/celebrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        router.push('/auth');
        return;
      }

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to add celebration');
      }
    } catch (error) {
      console.error('Error adding celebration:', error);
      alert('Failed to add celebration');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎊</div>
          <h1 style={{ color: '#2d3748', marginBottom: '0.5rem', fontSize: '2rem' }}>
            Add New Celebration
          </h1>
          <p style={{ color: '#718096', fontSize: '1rem' }}>
            Create a new celebration to track and never miss important moments!
          </p>
        </div>
        <CelebrationForm onSubmit={handleAdd} />
      </div>
    </div>
  );
}
