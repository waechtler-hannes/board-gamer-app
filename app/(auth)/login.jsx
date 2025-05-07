import React from 'react'
import { TextInput, StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import Spacer from '../../components/Spacer'
import Logo from '../../assets/img/logo.png'

const Login = () => {

  const handleSubmit = () => {
    console.log('login form submitted') //Login-Logik implementieren!
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Image source={Logo} style={styles.image}/>
      <View style={styles.input}>
        <Text>E-Mail-Adresse:</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <Spacer height={20}/>
      <View style={styles.input}>
        <Text>Passwort:</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <BasicButton
        onPress={handleSubmit}
        title="Login"
        style={{ width: "50%", marginVertical: 50 }}
      />
      <Text>Kein Konto? Hier gehts zur <Link href="/register" style={{color: Colors.primary}} >Registrierung</Link>.</Text>
    </View>
  )
}

export default Login

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
  image: {
    alignSelf: "center",
    marginVertical: 30
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