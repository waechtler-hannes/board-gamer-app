import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'
import { UserProvider } from '../contexts/UserContext'


const RootLayout = () => {
  return (
    <UserProvider>
      <StatusBar barStyle="light-content"/>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </UserProvider>
  )
}

export default RootLayout