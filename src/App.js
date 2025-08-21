import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NhostProvider, useAuthenticationStatus } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { nhost } from './utils/nhost'
import client from './utils/apollo'

import Auth from './components/Auth'
import ForgotPassword from './components/ForgotPassword'
import ChatList from './components/ChatList'
import ChatMessages from './components/ChatMessages'

function ChatApp() {
  const [selectedChatId, setSelectedChatId] = useState(null)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: 300, borderRight: '1px solid #ddd', overflowY: 'auto' }}>
        <ChatList onSelect={setSelectedChatId} selectedChatId={selectedChatId} />
      </aside>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedChatId ? (
          <ChatMessages chatId={selectedChatId} />
        ) : (
          <div style={{ padding: 20, color: '#666' }}>Select a chat to start messaging</div>
        )}
      </main>
    </div>
  )
}

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  if (isLoading) return <div style={{ padding: 20 }}>Loading...</div>
  if (!isAuthenticated) return <Auth />

  return <ChatApp />
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
