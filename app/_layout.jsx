import { StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import { UserProvider } from '../contexts/UserContext'
import { EventsProvider } from '../contexts/EventsContext'

const RootLayout = () => {
  return (
    <UserProvider>
      <EventsProvider>
        <StatusBar barStyle="light-content"/>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)"/>
          <Stack.Screen name="(interactions)"/>
          <Stack.Screen name="(operations)"/>
          <Stack.Screen name="(user)"/>
        </Stack>
      </EventsProvider>
    </UserProvider>
  )
}

export default RootLayout