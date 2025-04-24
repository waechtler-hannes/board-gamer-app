import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const RootLayout = () => {
  return (
    <>
      <StatusBar value="auto" style="light"/>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </> 
  )
}

export default RootLayout