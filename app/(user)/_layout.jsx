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
        <Stack.Screen name="chat" options={{ title: 'Chat' }}/>
        <Stack.Screen name="profile" options={{ title: 'Profil' }}/>
    </Stack>
  )
}

export default UserLayout