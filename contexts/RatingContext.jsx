import { createContext, useState } from 'react'
import { databases } from '../lib/appwrite'
import { ID } from 'react-native-appwrite'

const DATABASE_ID = '682d7452002c55c324be'
const COLLECTION_ID = '6836c074000d12deafa1'

export const RatingContext = createContext()

export function RatingProvider({ children }) {
  const [ratings, setRatings] = useState([])

  async function createRating(data) {
    try {
      const newRating = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        data
      )
      setRatings(prev => [...prev, newRating])
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <RatingContext.Provider value={{ ratings, createRating }}>
      {children}
    </RatingContext.Provider>
  )
}