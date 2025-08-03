'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CelebrationForm from '../../../../components/CelebrationForm';

export default function EditCelebration({ id }) {
  const [celebration, setCelebration] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) fetchCelebration();
  }, [id]);

  async function fetchCelebration() {
    try {
      const res = await fetch(`/api/celebrations/${id}`);
      if (res.status === 401) {
        router.push('/auth');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setCelebration(data);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching celebration:', error);
      router.push('/dashboard');
    }
    setLoading(false);
  }

  async function handleEdit(data) {
    try {
      const res = await fetch(`/api/celebrations/${id}`, {
        method: 'PUT',
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
        alert(error.error || 'Failed to update celebration');
      }
    } catch (error) {
      console.error('Error updating celebration:', error);
      alert('Failed to update celebration');
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!celebration) return <div>Celebration not found</div>;

  return <CelebrationForm initialData={celebration} onSubmit={handleEdit} />;
}
