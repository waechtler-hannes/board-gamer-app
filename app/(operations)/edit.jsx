import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { router } from 'expo-router'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'

const Edit = () => {
  return (
    <View style={styles.container}>

        <BasicButton
          onPress={() => router.navigate('/create')}
          title="Event erstellen"
          style={{
            width: "65%",
            alignSelf: "center",
            marginVertical: 20
          }}
        />

    </View>
  )
}

export default Edit

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  keyboardAvoider: {
    flex: 1,
    flexDirection: 'column'
  },
  scrollContainer: {
    padding: 10
  }
})