import React, { useState } from 'react'
import { NhostProvider, useAuthenticationStatus } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { nhost } from './utils/nhost'
import client from './utils/apollo'
import Auth from './components/Auth'
import ChatList from './components/ChatList'
import ChatMessages from './components/ChatMessages'

function ChatApp() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const [selectedChatId, setSelectedChatId] = useState(null)

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <Auth />

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <ChatList selectedChatId={selectedChatId} onSelect={setSelectedChatId} />
      <ChatMessages chatId={selectedChatId} />
    </div>
  )
}

export default function App() {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost} apolloClient={client}>
        <ChatApp />
      </NhostApolloProvider>
    </NhostProvider>
  )
}
