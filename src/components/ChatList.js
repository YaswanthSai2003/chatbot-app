import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CHATS, CREATE_CHAT } from '../graphql/queries'

export default function ChatList({ selectedChatId, onSelect }) {
  const { data, loading, error } = useQuery(GET_CHATS)
  const [createChat] = useMutation(CREATE_CHAT, { refetchQueries: [{ query: GET_CHATS }] })

  if (loading) return <div>Loading chats...</div>
  if (error) return <div>Error loading chats</div>

  const handleNewChat = async () => {
    const title = `Chat ${new Date().toLocaleString()}`
    const res = await createChat({ variables: { title } })
    onSelect(res.data.insert_chats_one.id)
  }

  return (
    <div style={{ width: 280, borderRight: '1px solid #ddd', padding: 16, height: '100vh', overflowY: 'auto' }}>
      <button style={{ width: '100%', marginBottom: 16, padding: 10, backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: 4 }} onClick={handleNewChat}>
        New Chat
      </button>
      {data.chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => onSelect(chat.id)}
          style={{
            padding: 12,
            marginBottom: 8,
            backgroundColor: chat.id === selectedChatId ? '#BBDEFB' : '#f9f9f9',
            cursor: 'pointer',
            borderRadius: 4,
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{chat.title}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{new Date(chat.updated_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
