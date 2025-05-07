import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'react-native'

export default function UserLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </>
  )
}