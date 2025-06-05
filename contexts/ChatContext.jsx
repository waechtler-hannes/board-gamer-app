import { createContext, useEffect, useRef, useState } from 'react'
import { databases, client, Query } from '../lib/appwrite'
import { useUser } from '../hooks/useUser'

const DATABASE_ID = '682d7452002c55c324be'
const COLLECTION_ID = '68402ffb001ab3695335'
const PAGE_SIZE = 10000

export const ChatContext = createContext()

export function ChatProvider({ children }) {
  const { user } = useUser()
  const [messages, setMessages] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const flatListRef = useRef(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async (before) => {
    setLoading(true)
    let queries = [
      Query.orderDesc('createdAt'),
      Query.limit(PAGE_SIZE)
    ]
    if (before) {
      queries.push(Query.lessThan('createdAt', before))
    }
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries)
    let newMessages = res.documents
    if (before) {
      setMessages(prev => [...newMessages.reverse(), ...prev])
    } else {
      setMessages(newMessages.reverse())
    }
    setHasMore(newMessages.length === PAGE_SIZE)
    setLastMessage(newMessages.length > 0 ? newMessages[newMessages.length - 1] : null)
    setLoading(false)
  }

  useEffect(() => {
    const unsubscribe = client.subscribe(
      [`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`],
      response => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          setMessages(prev => [...prev, response.payload])
        }
      }
    )
    return () => unsubscribe()
  }, [])

  const sendMessage = async (text) => {
    if (!text.trim()) return
    await databases.createDocument(DATABASE_ID, COLLECTION_ID, 'unique()', {
      userId: user?.$id,
      userName: user?.name,
      text,
      createdAt: new Date().toISOString()
    })
  }

  return (
    <ChatContext.Provider value={{
      messages,
      sendMessage,
      flatListRef,
      hasMore
    }}>
      {children}
    </ChatContext.Provider>
  )
}