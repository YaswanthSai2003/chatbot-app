import React, { useState } from 'react'
import { useResetPassword } from '@nhost/react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const { resetPassword, isLoading, isSuccess, isError, error } = useResetPassword()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await resetPassword(email)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Forgot Password</h2>

        {isSuccess ? (
          <p style={styles.successText}>Check your email for the password reset link.</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" disabled={isLoading} style={styles.button}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            {isError && <p style={styles.errorText}>{error.message}</p>}
          </form>
        )}
        <p style={styles.switchText}>
          Remembered your password? <Link to="/" style={styles.link}>Sign In here</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage:
      'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 16,
  },
  card: {
    backgroundColor: 'rgba(0,0,50,0.85)',
    padding: 32,
    borderRadius: 12,
    width: 360,
    maxWidth: '100%',
    color: 'white',
    boxShadow: '0 8px 16px rgba(0,0,0,0.7)',
    textAlign: 'center',
  },
  heading: {
    marginBottom: 24,
    fontWeight: '700',
    fontSize: 28,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderRadius: 6,
    border: 'none',
    outline: 'none',
    fontWeight: '500',
  },
  button: {
    padding: 12,
    fontSize: 18,
    fontWeight: '600',
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#00a8ff',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  successText: {
    fontSize: 16,
    color: '#94d82d',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 8,
    color: '#f03e3e',
  },
  switchText: {
    marginTop: 24,
    fontSize: 14,
  },
  link: {
    color: '#00a8ff',
    textDecoration: 'underline',
  },
}
