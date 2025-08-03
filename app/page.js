export default function Home() {
  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '500px', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="auth-title" style={{ marginBottom: '1rem', color: '#2d3748' }}>
            🎉 Personal Celebration Tracker
          </h1>
          <p style={{ color: '#718096', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Never miss another important moment! Track birthdays, anniversaries, achievements, and special occasions all in one place.
          </p>
        </div>

        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>✨ Features</h3>
          <div style={{ textAlign: 'left', color: '#4a5568' }}>
            <p style={{ marginBottom: '0.5rem' }}>📅 Track multiple celebration types</p>
            <p style={{ marginBottom: '0.5rem' }}>🔔 Never forget important dates</p>
            <p style={{ marginBottom: '0.5rem' }}>📝 Add personal notes and descriptions</p>
            <p>🎯 Organize by categories</p>
          </div>
        </div>

        <div className="auth-form" style={{ gap: '1rem' }}>
          <a href="/auth" className="login-button" style={{
            display: 'block',
            textAlign: 'center',
            textDecoration: 'none',
            marginBottom: '0.5rem'
          }}>
            🔑 Login to Your Account
          </a>
          <a href="/signup" className="signup-button" style={{
            display: 'block',
            textAlign: 'center',
            textDecoration: 'none'
          }}>
            🚀 Create New Account
          </a>
        </div>

        <p style={{ marginTop: '2rem', color: '#a0aec0', fontSize: '0.9rem' }}>
          Start celebrating life's special moments today!
        </p>
      </div>
    </div>
  );
}
