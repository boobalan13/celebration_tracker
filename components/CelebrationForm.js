import React, { useState } from 'react';

const types = ['birthday', 'anniversary', 'achievement', 'festival', 'other'];

export default function CelebrationForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    date: initialData.date || '',
    type: initialData.type || types[0],
    description: initialData.description || '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

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

  return (
    <form className="celebration-form" onSubmit={handleSubmit}>
      <div>
        <label className="form-label" style={{ color: '#2d3748', fontWeight: '600' }}>
          🏷️ Celebration Title
        </label>
        <input
          className="form-input"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g., Mom's Birthday, Wedding Anniversary"
          required
          style={{ marginTop: '0.5rem' }}
        />
      </div>

      <div>
        <label className="form-label" style={{ color: '#2d3748', fontWeight: '600' }}>
          📅 Date
        </label>
        <input
          className="form-input"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          style={{ marginTop: '0.5rem' }}
        />
      </div>

      <div>
        <label className="form-label" style={{ color: '#2d3748', fontWeight: '600' }}>
          🎯 Celebration Type
        </label>
        <select
          className="form-select"
          name="type"
          value={form.type}
          onChange={handleChange}
          style={{ marginTop: '0.5rem' }}
        >
          {types.map(t => (
            <option key={t} value={t}>
              {getTypeEmoji(t)} {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="form-label" style={{ color: '#2d3748', fontWeight: '600' }}>
          📝 Description (Optional)
        </label>
        <textarea
          className="form-textarea"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add any special notes, memories, or details about this celebration..."
          style={{ marginTop: '0.5rem' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          className="form-button"
          type="submit"
          style={{ flex: 1 }}
        >
          💾 Save Celebration
        </button>
        <a
          href="/dashboard"
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '0.75em 1.5em',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          ↩️ Cancel
        </a>
      </div>
    </form>
  );
}
