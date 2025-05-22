import { StatusBar } from 'react-native'
import { Stack } from 'expo-router'

//Eigene Komponenten
import GuestOnly from '../../components/auth/GuestOnly'

export default function UserLayout() {

  return (
    <GuestOnly>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </GuestOnly>
  )
}