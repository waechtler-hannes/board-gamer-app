import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

//Konstanten
import { Colors } from '../constants/Colors'

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