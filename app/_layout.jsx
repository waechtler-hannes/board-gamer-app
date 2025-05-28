import { StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import { UserProvider } from '../contexts/UserContext'
import { HostsProvider } from '../contexts/HostContext'
import { EventsProvider } from '../contexts/EventsContext'
import { RatingProvider } from '../contexts/RatingContext'

const RootLayout = () => {
  return (
    <UserProvider>
      <HostsProvider>
        <EventsProvider>
          <RatingProvider>
            <StatusBar barStyle="light-content"/>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)"/>
              <Stack.Screen name="(interactions)"/>
              <Stack.Screen name="(operations)"/>
              <Stack.Screen name="(user)"/>
            </Stack>
          </RatingProvider>
        </EventsProvider>
      </HostsProvider>
    </UserProvider>
  )
}

export default RootLayout