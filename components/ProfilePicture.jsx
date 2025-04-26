import React from 'react'
import { Colors } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const ProfilePicture = () => {
  return (
    <Ionicons
        size={150}
        name="person-circle-outline"
        style={{padding: 10}}
        color={Colors.primary}
    />
  )
}

export default ProfilePicture