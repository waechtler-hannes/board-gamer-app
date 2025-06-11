import { createContext, useEffect, useState } from 'react'
import { ID } from 'react-native-appwrite'
import { databases, client, Query } from '../lib/appwrite'

const DATABASE_ID = '682d7452002c55c324be'
const COLLECTION_ID = '6836c074000d12deafa1'

export const RatingContext = createContext()

export function RatingProvider({ children }) {
  const [ratingsByEvent, setRatingsByEvent] = useState({})

  async function fetchRatings(eventId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('eventId', eventId)]
      )
      setRatingsByEvent(prev => ({
        ...prev,
        [eventId]: response.documents
      }))
    } catch (error) {
      console.error(error.message)
    }
  }

  async function createRating(data) {
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        data
      )
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`
    const unsubscribe = client.subscribe(channel, (response) => {
      const { payload, events } = response
      if (events[0].includes('create')) {
        setRatingsByEvent(prev => {
          const eventId = payload.eventId
          const prevList = prev[eventId] || []
          if (prevList.some(r => r.$id === payload.$id)) return prev
          return {
            ...prev,
            [eventId]: [...prevList, payload]
          }
        })
      }
      if (events[0].includes('update')) {
        setRatingsByEvent(prev => {
          const eventId = payload.eventId
          const prevList = prev[eventId] || []
          return {
            ...prev,
            [eventId]: prevList.map(r => r.$id === payload.$id ? payload : r)
          }
        })
      }
      if (events[0].includes('delete')) {
        setRatingsByEvent(prev => {
          const eventId = payload.eventId
          const prevList = prev[eventId] || []
          return {
            ...prev,
            [eventId]: prevList.filter(r => r.$id !== payload.$id)
          }
        })
      }
    })
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return (
    <RatingContext.Provider value={{ ratingsByEvent, fetchRatings, createRating }}>
      {children}
    </RatingContext.Provider>
  )
}