import React, {useState} from 'react'
import { Keyboard, TextInput, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import {useUser} from '../../hooks/useUser'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import Spacer from '../../components/Spacer'
import Logo from '../../assets/img/logo.png'



const Login = () => {
const [email, setEmail] = useState ('')
const [password, setPassword] = useState ('')

const { user } = useUser()

    const handleSubmit = () => {
      console.log('current user:', user)  
      console.log('login form submitted', email, password)
    }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Image source={Logo} style={styles.image}/>
      <View style={styles.input}>
        <Text>E-Mail-Adresse:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email" 
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        ></TextInput>
      </View>
      <Spacer height={20}/>
      <View style={styles.input}>
        <Text>Passwort</Text>
        <TextInput
          style={styles.textInput} 
          placeholder="Passwort" 
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <BasicButton
        onPress={handleSubmit}
        title="Login"
        style={{ width: "50%", marginVertical: 50 }}
      />
      <Text>Kein Konto? Hier gehts zur <Link href="/register" style={{color: Colors.primary}} >Registrierung</Link>.</Text>
    </View>
    </TouchableWithoutFeedback>
);
};


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