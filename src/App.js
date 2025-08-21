import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NhostProvider, useAuthenticationStatus } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { nhost } from './utils/nhost'
import client from './utils/apollo'
import Auth from './components/Auth'
import ForgotPassword from './components/ForgotPassword'

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  if (isLoading) return <div style={{padding: 20}}>Loading...</div>
  if (!isAuthenticated) return <Auth />

  return (
    <div style={{padding: 20}}>
      <h1>Welcome! You are signed in.</h1>
      {/* Your app main components here */}
    </div>
  )
}

export default function App() {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost} apolloClient={client}>
        <Router>
          <Routes>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </Router>
      </NhostApolloProvider>
    </NhostProvider>
  )
}
