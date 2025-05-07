import React from 'react'
import { TextInput, StyleSheet, Text, View } from 'react-native'
import { Link} from 'expo-router'
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import Spacer from '../../components/Spacer'
import BasicButton from '../../components/BasicButton'

const Register = () => {

  const handleSubmit = () => {
    console.log('register form submitted') //Registrierungs-Logik implementieren!
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrierung</Text>
      <Spacer/>
      <View style={styles.input}>
        <Text>E-Mail-Adresse:</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <Spacer height={15}/>
      <View style={styles.input}>
        <Text>Passwort:</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <Spacer height={15}/>
      <View style={styles.input}>
        <Text>Passwort wiederholen:</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <BasicButton
        onPress={handleSubmit}
        title="Registrieren"
        style={{ width: "50%", marginVertical: 50 }}
      />
      <Text>Du hast bereits ein Konto? Hier geht's zum <Link href=".." style={{color: Colors.primary}} >Login</Link>.</Text>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    width: "80%"
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.outline
  }
})