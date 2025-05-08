import React, { useState } from 'react'
import { Keyboard, TextInput, StyleSheet, Text, View, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Link } from 'expo-router'
import { useUser } from '../../hooks/useUser'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import Spacer from '../../components/Spacer'
import Logo from '../../assets/img/logo.png'

const Login = () => {

  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState ('')
  const { login } = useUser()

  const handleSubmit = async () => {
    try {
      await login(email, password)
    } catch (error) {
      
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <Text style={styles.header}>Login</Text>

        <Image source={Logo} style={styles.image}/>

        <KeyboardAvoidingView behavior='padding' style={{width: "100%", alignItems: "center"}}>
          <TextInput
            style={styles.textInput}
            placeholder="Email" 
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
          <Spacer height={20}/>
          <TextInput
            style={styles.textInput} 
            placeholder="Passwort" 
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <BasicButton
            onPress={handleSubmit}
            title="Login"
            style={{ width: "50%", marginVertical: 30 }}
          />
        </KeyboardAvoidingView>

        <Text style={styles.link}>Kein Konto? Hier gehts zur <Link href="/register" style={{color: Colors.primary}} >Registrierung</Link>.</Text>

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
    marginVertical: 30,
    height: 150,
    aspectRatio: 1
  },
  textInput: {
    backgroundColor: 'white',
    width: "80%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.outline
  },
  link: {
    marginTop: 50
  }
})