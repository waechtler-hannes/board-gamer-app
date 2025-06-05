import { Stack } from 'expo-router'
import { ChatProvider } from '../../contexts/ChatContext'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import UserOnly from '../../components/auth/UserOnly'

const UserLayout = () => {
  return (
    <UserOnly>
      <ChatProvider>
        <Stack screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: Colors.primary},
            headerTintColor: Colors.primaryText
        }}>
          <Stack.Screen name="chat" options={{ title: 'Chat' }}/>
          <Stack.Screen name="profile" options={{ title: 'Profil' }}/>
        </Stack>
      </ChatProvider>
    </UserOnly>
  )
}

export default UserLayout