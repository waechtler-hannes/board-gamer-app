import React from 'react'
import { StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import { UserProvider } from '../contexts/UserContext'

const RootLayout = () => {
  return (
    <UserProvider>
      <StatusBar barStyle="light-content"/>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)"/>
        <Stack.Screen name="(interactions)"/>
        <Stack.Screen name="(operations)"/>
        <Stack.Screen name="(user)"/>
      </Stack>
    </UserProvider>
  )
}

export default RootLayout