"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
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
    console.log("Form submitted:", form);

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    console.log("Making API request to /api/auth/register");

    try {
      const res = await fetch("https://celebration-tracker.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (data.success) {
        alert("Successfully registered! You can now login.");
        router.push("/auth");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Registration failed. Please try again.");
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
          <h1 className="auth-title" style={{ marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: '#718096', fontSize: '0.95rem' }}>
            Create your account and start tracking special moments
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
              className="auth-input signup-input"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              Create Password
            </label>
            <input
              className="auth-input signup-input"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password (6+ characters)"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              Confirm Password
            </label>
            <input
              className="auth-input signup-input"
              name="confirm"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <label className="show-password" style={{ marginTop: '0.5rem' }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show Passwords
          </label>

          <button
            className="signup-button"
            type="submit"
            disabled={loading}
            style={{ position: 'relative' }}
          >
            {loading ? (
              <span style={{ opacity: 0.7 }}>Creating Account...</span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p className="auth-link signup-link">
            Already have an account?{' '}
            <Link href="/auth" style={{ fontWeight: '600' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
