import { router, Tabs } from 'expo-router'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import ChatButton from '../../components/chatButton'
import ProfileButton from '../../components/ProfileButton'

const InteractionsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: Colors.primaryText,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.primaryDark,
        headerStyle: {
          backgroundColor: Colors.primary
        },
        tabBarStyle: {
          height: 55
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
        name="index"
        options={{ title: "Events", tabBarIcon: ({ focused }) => (
          <Ionicons
            size={24}
            name={focused ? "calendar" : "calendar-outline"}
            color={focused ? Colors.primary : Colors.primaryDark}
          />
        ) }}
      />
    </Tabs>
  )
}

export default InteractionsLayout