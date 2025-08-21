import React, { useState } from 'react'
import { useSignInEmailPassword, useSignUpEmailPassword, useUserData, useSignOut } from '@nhost/react'

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
      <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <h2>Email Verification Required</h2>
        <p>Please check your email inbox and verify your email address before continuing.</p>
        <button onClick={() => signOut()} style={{ padding: 10 }}>Sign Out</button>
      </div>
    )
  }

  if (user) {
    return (
      <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <h2>Welcome, {user.email}</h2>
        <button onClick={() => signOut()} style={{ padding: 10 }}>Sign Out</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
        <button disabled={loadingSignIn || loadingSignUp} type="submit" style={{ width: '100%', padding: 10 }}>
          {loadingSignIn || loadingSignUp ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>
      </form>
      {(errorSignIn || errorSignUp) && <p style={{ color: 'red' }}>{(errorSignIn || errorSignUp).message}</p>}
      <p style={{ marginTop: 12, textAlign: 'center' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  )
}
