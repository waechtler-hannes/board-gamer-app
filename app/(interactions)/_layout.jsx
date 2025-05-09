import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import ChatButton from '../../components/chatButton'
import ProfileButton from '../../components/ProfileButton'
import UserOnly from '../../components/auth/UserOnly'

const InteractionsLayout = () => {
  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: Colors.primaryText,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.primaryDark,
          tabBarHideOnKeyboard: true,
          headerStyle: {
            backgroundColor: Colors.primary
          },
          tabBarStyle: {
            height: 75
          },
          tabBarItemStyle: {
            flexDirection: "row",
            alignItems: "center"
          },
          headerRight: () =>
            <>
              <ChatButton/>
              <ProfileButton/>
            </>
        }}
      >
        <Tabs.Screen
          name="evaluation"
          options={{ title: "Bewertung", tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "star" : "star-outline"}
              color={focused ? Colors.primary : Colors.primaryDark}
            />
          ) }}
        />
        <Tabs.Screen
          name="events"
          options={{ title: "Events", tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "calendar" : "calendar-outline"}
              color={focused ? Colors.primary : Colors.primaryDark}
            />
          ) }}
        />
      </Tabs>
    </UserOnly>
  )
}

export default InteractionsLayout