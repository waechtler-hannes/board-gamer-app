import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { UserProvider } from '../contexts/UserContext'

// ggf. UserProvider einfügen von '../contexts/UserContext' (Tutorial Nr. 14)

const RootLayout = () => {
  return (
    <>
    <UserProvider>
      <StatusBar value="auto" style="light"/>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(interactions)" options={{ headerShown: false }} />
        <Stack.Screen name="(operations)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
      </Stack>
      </UserProvider>
    </>
  )
}

export default RootLayout