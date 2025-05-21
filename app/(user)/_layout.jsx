import { Stack } from 'expo-router'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import UserOnly from '../../components/auth/UserOnly'

const UserLayout = () => {
  return (
    <UserOnly>
      <Stack screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Colors.primary},
          headerTintColor: Colors.primaryText
      }}>
          <Stack.Screen name="chat" options={{ title: 'Chat' }}/>
          <Stack.Screen name="profile" options={{ title: 'Profil' }}/>
      </Stack>
    </UserOnly>
  )
}

export default UserLayout