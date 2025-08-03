'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CelebrationCard from '../../components/CelebrationCard';
import Modal from '../../components/Modal';


export default function Dashboard() {
  const [celebrations, setCelebrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCelebration, setSelectedCelebration] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCelebrations();
  }, []);

  async function fetchCelebrations() {
    try {
      const res = await fetch('/api/celebrations');
      if (res.status === 401) {
        router.push('/auth');
        return;
      }
      const data = await res.json();
      setCelebrations(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching celebrations:', error);
      setLoading(false);
    }
  }

  async function handleEdit(celebration) {
    router.push(`/celebration/edit/${celebration._id}`);
  }

  async function handleDelete(celebration) {
    setSelectedCelebration(celebration);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    try {
      const res = await fetch(`/api/celebrations/${selectedCelebration._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCelebrations(celebrations.filter(c => c._id !== selectedCelebration._id));
      }
    } catch (error) {
      console.error('Error deleting celebration:', error);
    }
    setShowDeleteModal(false);
    setSelectedCelebration(null);
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉</div>
          <p style={{ color: '#718096' }}>Loading your celebrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>🎊 Your Celebrations</h2>
          <p style={{ color: '#718096', fontSize: '0.95rem' }}>
            {celebrations.length} celebration{celebrations.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
        <a href="/add" className="form-button" style={{
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '0.9rem'
        }}>
          ➕ Add New
        </a>
      </div>

      {celebrations.length === 0 ? (
        <div className="auth-card" style={{ textAlign: 'center', maxWidth: '500px', margin: '2rem auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎈</div>
          <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>No celebrations yet!</h3>
          <p style={{ color: '#718096', marginBottom: '2rem', lineHeight: '1.6' }}>
            Start tracking your special moments. Add birthdays, anniversaries, achievements, and more!
          </p>
          <a href="/add" className="signup-button" style={{
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            🚀 Add Your First Celebration
          </a>
        </div>
      ) : (
        <div className="cards">
          {celebrations.map(c => (
            <CelebrationCard
              key={c._id}
              celebration={c}
              onEdit={() => handleEdit(c)}
              onDelete={() => handleDelete(c)}
            />
          ))}
        </div>
      )}

      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗑️</div>
          <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>Delete Celebration</h3>
          <p style={{ color: '#718096', marginBottom: '2rem' }}>
            Are you sure you want to delete <strong>"{selectedCelebration?.title}"</strong>?
            <br />
            <span style={{ fontSize: '0.9rem' }}>This action cannot be undone.</span>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={confirmDelete}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              🗑️ Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="form-button"
            >
              ↩️ Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
