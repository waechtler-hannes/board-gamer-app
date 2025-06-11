import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

//Konstanten
import { Colors } from '../constants/Colors'

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