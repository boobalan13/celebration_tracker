'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CelebrationCard from '../../../components/CelebrationCard';
import Modal from '../../../components/Modal';

export default function CelebrationDetail({ params }) {
  const [celebration, setCelebration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCelebration();
  }, [params.id]);

  async function fetchCelebration() {
    try {
      const res = await fetch(`https://celebration-tracker.onrender.com/api/celebrations/${params.id}`);
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

  async function handleDelete() {
    try {
      const res = await fetch(`https://celebration-tracker.onrender.com/api/celebrations/${params.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error deleting celebration:', error);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!celebration) return <div>Celebration not found</div>;

  return (
    <div>
      <CelebrationCard celebration={celebration} />
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => router.push(`/celebration/edit/${params.id}`)}>Edit</button>
        <button onClick={() => setOpen(true)}>Delete</button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <p>Are you sure you want to delete this celebration?</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
