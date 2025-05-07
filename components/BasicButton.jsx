import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { Colors } from '../constants/Colors'

const BasicButton = ({onPress, title, style}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.btn, pressed && styles.pressed, style]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  )
}

export default BasicButton

const styles = StyleSheet.create({
    btnText: {
        color: Colors.primaryText
    },
    btn: {
      backgroundColor: Colors.primary,
      padding: 15,
      borderRadius: 30,
      alignItems: "center"
    },
    pressed: {
      opacity: 0.8
    }
})