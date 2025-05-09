import React from 'react'
import { StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import { useUser } from '../../hooks/useUser'

//Eigene Komponenten
import GuestOnly from '../../components/auth/GuestOnly'

export default function UserLayout() {

  const { user } = useUser()
  console.log(user)

  return (
    <GuestOnly>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </GuestOnly>
  )
}