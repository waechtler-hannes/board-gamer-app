import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '../../constants/Colors'

const UserLayout = () => {
  return (
    <Stack screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: Colors.primary},
        headerTintColor: Colors.primaryText
    }}>
        <Stack.Screen name="login" options={{ title: 'Login' }}/>
        <Stack.Screen name="register" options={{ title: 'Registrierung' }}/>
    </Stack>
  )
}

export default UserLayout