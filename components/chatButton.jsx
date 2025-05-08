import React from 'react'
import { Colors } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const ChatButton = () => {
  return (
    <Ionicons
        size={24}
        name="chatbox"
        style={{padding: 5, position: "relative", top: 1.5}}
        color={Colors.primaryText}
        onPress={() => router.navigate('/chat')}
    />
  )
}

export default ChatButton