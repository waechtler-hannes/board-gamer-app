import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

//Eigene Komponenten
import GuestOnly from '../../components/auth/GuestOnly'

export default function UserLayout() {

  return (
    <GuestOnly>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </GuestOnly>
  )
}