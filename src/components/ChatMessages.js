import React, { useState, useEffect, useRef } from 'react'
import { useSubscription, useMutation } from '@apollo/client'
import { MESSAGES_SUBSCRIPTION, CREATE_MESSAGE, SEND_MESSAGE_ACTION } from '../graphql/queries'

export default function ChatMessages({ chatId }) {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { chat_id: chatId },
    skip: !chatId,
  })

  const [createMessage] = useMutation(CREATE_MESSAGE)
  const [sendMessageAction] = useMutation(SEND_MESSAGE_ACTION)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [data])

  if (!chatId) return <div style={{ padding: 20 }}>Select a chat to view messages.</div>
  if (loading) return <div>Loading messages...</div>
  if (error) return <div>Error loading messages.</div>

  const handleSend = async e => {
    e.preventDefault()
    if (!inputMessage.trim()) return
    await createMessage({ variables: { chat_id: chatId, content: inputMessage } })
    await sendMessageAction({ variables: { chat_id: chatId, message: inputMessage } })
    setInputMessage('')
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, backgroundColor: '#f0f0f0' }}>
        {data?.messages.map(msg => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.is_bot ? 'left' : 'right',
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                borderRadius: 20,
                padding: '8px 12px',
                backgroundColor: msg.is_bot ? '#d0d7ff' : '#1976d2',
                color: msg.is_bot ? '#000' : '#fff',
                maxWidth: '70%',
                wordWrap: 'break-word',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} style={{ padding: 16, display: 'flex', gap: 8, backgroundColor: 'white' }}>
        <input
          style={{ flex: 1, padding: 10, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
        />
        <button style={{ padding: '10px 16px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: 4 }} type="submit">
          Send
        </button>
      </form>
    </div>
  )
}
