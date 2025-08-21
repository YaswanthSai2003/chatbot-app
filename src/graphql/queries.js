import { gql } from '@apollo/client'

export const GET_CHATS = gql`
  query GetChats {
    chats(order_by: {updated_at: desc}) {
      id
      title
      updated_at
    }
  }
`

export const GET_MESSAGES = gql`
  query GetMessages($chat_id: uuid!) {
    messages(where: {chat_id: {_eq: $chat_id}}, order_by: {created_at: asc}) {
      id
      content
      is_bot
      created_at
    }
  }
`

export const MESSAGES_SUBSCRIPTION = gql`
  subscription MessagesSubscription($chat_id: uuid!) {
    messages(where: {chat_id: {_eq: $chat_id}}, order_by: {created_at: asc}) {
      id
      content
      is_bot
      created_at
    }
  }
`

export const CREATE_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: {title: $title}) {
      id
      title
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($chat_id: uuid!, $content: String!) {
    insert_messages_one(object: {chat_id: $chat_id, content: $content}) {
      id
    }
  }
`

export const SEND_MESSAGE_ACTION = gql`
  mutation SendMessage($chat_id: uuid!, $message: String!) {
  sendMessage(chat_id: $chat_id, message: $message) {
    success
    message
  }
}
`
