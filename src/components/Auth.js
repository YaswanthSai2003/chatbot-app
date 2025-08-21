import React, { useState } from 'react'
import {
  useSignInEmailPassword,
  useSignUpEmailPassword,
  useUserData,
  useAuthenticationStatus,
  useSignOut,
} from '@nhost/react'
import { Link } from 'react-router-dom'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const user = useUserData()
  const { isAuthenticated, isLoading: authLoading } = useAuthenticationStatus()
  const signOut = useSignOut()

  const {
    signInEmailPassword,
    isLoading: loadingSignIn,
    error: errorSignIn,
  } = useSignInEmailPassword()
  const {
    signUpEmailPassword,
    isLoading: loadingSignUp,
    error: errorSignUp,
  } = useSignUpEmailPassword()

  if (authLoading) {
    return (
      <div style={styles.container}>
        <p style={{ color: 'white' }}>Loading...</p>
      </div>
    )
  }

  if (isAuthenticated && user && !user.emailVerified) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Email Verification Required</h2>
          <p style={styles.text}>
            Please verify your email by clicking the link sent to your inbox.
            Check spam folder as well.
          </p>
          <button onClick={() => signOut()} style={styles.button}>
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  if (isAuthenticated && user && user.emailVerified) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Welcome, {user.email}</h2>
          <button onClick={() => signOut()} style={styles.button}>
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      await signInEmailPassword(email, password)
    } else {
      await signUpEmailPassword(email, password)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
          />
          <button type="submit" disabled={loadingSignIn || loadingSignUp} style={styles.button}>
            {loadingSignIn || loadingSignUp
              ? 'Loading...'
              : isLogin
              ? 'Sign In'
              : 'Sign Up'}
          </button>
        </form>
        {(errorSignIn || errorSignUp) && (
          <p style={{ color: 'red', marginTop: 12 }}>
            {(errorSignIn || errorSignUp).message}
          </p>
        )}
        {isLogin && (
          <p style={styles.switchText}>
            Forgot password?{' '}
            <Link to="/forgot-password" style={styles.link}>
              Reset here
            </Link>
          </p>
        )}
        <p style={styles.switchText}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={styles.switchButton}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
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
  text: {
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 1.5,
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
  switchText: {
    marginTop: 16,
    fontSize: 14,
  },
  link: {
    color: '#00a8ff',
    textDecoration: 'underline',
  },
  switchButton: {
    border: 'none',
    background: 'none',
    color: '#00a8ff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: 14,
    padding: 0,
  },
}
