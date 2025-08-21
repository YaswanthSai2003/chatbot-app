import React, { useState } from 'react'
import { useSignInEmailPassword, useSignUpEmailPassword, useUserData, useSignOut } from '@nhost/react'
import { Link } from 'react-router-dom'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const user = useUserData()
  const signOut = useSignOut()

  const { signInEmailPassword, isLoading: loadingSignIn, error: errorSignIn } = useSignInEmailPassword()
  const { signUpEmailPassword, isLoading: loadingSignUp, error: errorSignUp } = useSignUpEmailPassword()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      await signInEmailPassword(email, password)
    } else {
      await signUpEmailPassword(email, password)
    }
  }

  if (user && !user.emailVerified) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Email Verification Required</h2>
          <p style={styles.text}>Please check your email inbox and verify your email address before continuing.</p>
          <button onClick={() => signOut()} style={styles.button}>Sign Out</button>
        </div>
      </div>
    )
  }

  if (user && user.emailVerified) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Welcome, {user.email}</h2>
          <button onClick={() => signOut()} style={styles.button}>Sign Out</button>
        </div>
      </div>
    )
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
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button disabled={loadingSignIn || loadingSignUp} type="submit" style={styles.button}>
            {loadingSignIn || loadingSignUp ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        {(errorSignIn || errorSignUp) && <p style={{ color: 'red', marginTop: 12 }}>{(errorSignIn || errorSignUp).message}</p>}
        {isLogin && (
          <p style={styles.switchText}>
            Forgot password? <Link to="/forgot-password" style={styles.link}>Reset here</Link>
          </p>
        )}
        <p style={styles.switchText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} style={styles.switchButton}>
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
    backgroundImage: 'url("https://www.shutterstock.com/image-vector/robot-chatbot-head-icon-sign-600nw-2011645328.jpg")',
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
