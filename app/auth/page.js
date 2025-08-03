"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }

    setLoading(false);
  }

  if (!mounted) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#718096' }}>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="auth-title" style={{ marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: '#718096', fontSize: '0.95rem' }}>
            Sign in to access your celebration tracker
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              Email Address
            </label>
            <input
              className="auth-input"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="password-container">
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              Password
            </label>
            <input
              className="auth-input"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-options">
            <label className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              Show Password
            </label>
            <Link href="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            className="login-button"
            type="submit"
            disabled={loading}
            style={{ position: 'relative' }}
          >
            {loading ? (
              <span style={{ opacity: 0.7 }}>Signing In...</span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p className="auth-link">
            New to Celebration Tracker?{' '}
            <Link href="/signup" style={{ fontWeight: '600' }}>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
