import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

const RootLayout = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </>
  )
}

export default RootLayout