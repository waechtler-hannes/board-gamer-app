import { Stack } from 'expo-router'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import UserOnly from '../../components/auth/UserOnly'

const OperationsLayout = () => {
  return (
    <UserOnly>
      <Stack screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Colors.primary},
          headerTintColor: Colors.primaryText
      }}>
          <Stack.Screen name="create" options={{ title: 'Event erstellen' }}/>
          <Stack.Screen name="edit" options={{ title: 'Event bearbeiten' }}/>
      </Stack>
    </UserOnly>
  )
}

export default OperationsLayout