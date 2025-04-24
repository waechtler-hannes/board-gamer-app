import React from 'react'
import { Colors } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const ProfileButton = () => {
  return (
    <Ionicons
        size={24}
        name="person-circle-outline"
        style={{padding: 10}}
        color={Colors.primaryText}
        onPress={() => router.navigate('/profile')}
    />
  )
}

export default ProfileButton