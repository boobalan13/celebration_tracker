import React from 'react';

export default function CelebrationCard({ celebration, onEdit, onDelete }) {
  const { title, date, type, description } = celebration;

  // Calculate days until celebration
  const celebrationDate = new Date(date);
  const today = new Date();
  const timeDiff = celebrationDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Get emoji for celebration type
  const getTypeEmoji = (type) => {
    const emojis = {
      birthday: '🎂',
      anniversary: '💕',
      achievement: '🏆',
      festival: '🎊',
      other: '🎉'
    };
    return emojis[type.toLowerCase()] || '🎉';
  };

  // Get status message
  const getStatusMessage = (days) => {
    if (days < 0) return `${Math.abs(days)} days ago`;
    if (days === 0) return 'Today! 🎉';
    if (days === 1) return 'Tomorrow';
    if (days <= 7) return `In ${days} days`;
    return `In ${days} days`;
  };

  const statusColor = daysDiff <= 0 ? '#dc3545' : daysDiff <= 7 ? '#fd7e14' : '#28a745';

  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="card-header" style={{ alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{getTypeEmoji(type)}</span>
          <span className={`type-tag ${type.toLowerCase()}`}>{type}</span>
        </div>
        <h3 style={{ color: '#2d3748', fontSize: '1.1rem', lineHeight: '1.3' }}>{title}</h3>
      </div>

      <div className="card-body">
        {description && (
          <p style={{
            color: '#4a5568',
            fontSize: '0.9rem',
            lineHeight: '1.4',
            marginBottom: '1rem'
          }}>
            {description}
          </p>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <p style={{
            color: '#2d3748',
            fontWeight: '500',
            marginBottom: '0.25rem'
          }}>
            📅 {celebrationDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p style={{
            color: statusColor,
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {getStatusMessage(daysDiff)}
          </p>
        </div>
      </div>

      <div className="card-actions" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
        <button
          onClick={onEdit}
          style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '500'
          }}
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '500'
          }}
        >
          🗑️ Delete
        </button>
      </div>

      {daysDiff <= 3 && daysDiff >= 0 && (
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: '#dc3545',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          {daysDiff === 0 ? 'TODAY!' : `${daysDiff}d`}
        </div>
      )}
    </div>
  );
}
