import React from 'react'
import { StatusBar } from 'react-native'
import { Stack } from 'expo-router'

export default function UserLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </>
  )
}