import React from 'react'
import { Stack } from 'expo-router'

//Konstanten
import { Colors } from '../../constants/Colors'

const OperationsLayout = () => {
  return (
    <Stack screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: Colors.primary},
        headerTintColor: Colors.primaryText
    }}>
        <Stack.Screen name="create" options={{ title: 'Event erstellen' }}/>
        <Stack.Screen name="edit" options={{ title: 'Event bearbeiten' }}/>
    </Stack>
  )
}

export default OperationsLayout