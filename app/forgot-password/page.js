"use client";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Forgot Password</h1>

        <p style={{ textAlign: 'center', color: '#718096', marginBottom: '2rem' }}>
          Password reset functionality will be implemented soon.
        </p>

        <Link href="/auth" className="login-button" style={{
          display: 'block',
          textAlign: 'center',
          textDecoration: 'none',
          padding: '1rem'
        }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
}
