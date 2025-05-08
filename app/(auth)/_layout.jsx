import React from 'react'
import { StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import { useUser } from '../../hooks/useUser'

export default function UserLayout() {

  const { user } = useUser()
  console.log(user)

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </>
  )
}