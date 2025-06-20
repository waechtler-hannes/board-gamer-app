import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import UserOnly from '../../components/auth/UserOnly'
import { ChatProvider } from '../../contexts/ChatContext'

const UserLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <UserOnly>
        <ChatProvider>
          <Stack
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primary
              },
              headerTintColor: Colors.primaryText
            }}
          >
            <Stack.Screen name="chat" options={{ title: 'Chat' }}/>
            <Stack.Screen name="profile" options={{ title: 'Profil' }}/>
          </Stack>
        </ChatProvider>
      </UserOnly>
    </SafeAreaView>
  )
}

export default UserLayout