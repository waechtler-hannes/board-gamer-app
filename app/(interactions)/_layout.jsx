import { Tabs } from 'expo-router'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import ChatButton from '../../components/ChatButton'
import ProfileButton from '../../components/ProfileButton'
import { StatusBar } from 'react-native'

const InteractionsLayout = () => {
  return (
    <>
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
    </>
  )
}

export default InteractionsLayout