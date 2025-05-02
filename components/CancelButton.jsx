import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const CancelButton = ({onPress, title}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.btn, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  )
}

export default CancelButton

const styles = StyleSheet.create({
    btnText: {
        color: Colors.Text
    },
    btn: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 30,
      alignItems: "center",
      borderWidth: 1,
      borderColor: Colors.outline,
    },
    pressed: {
      backgroundColor: Colors.primary,
      opacity: 0.4,
    }
})