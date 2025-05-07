import React, { useState } from 'react'
import { Keyboard, TextInput, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import Spacer from '../../components/Spacer'
import BasicButton from '../../components/BasicButton'


const Register = () => {

  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState ('')

  const handleSubmit = () => {
      console.log('register form submitted', email, password)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <Text style={styles.header}>Registrierung</Text>

        <Spacer/>
        
        <View style={styles.input}>
          <Text>E-Mail-Adresse:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email" 
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        
        <Spacer height={15}/>
        
        <View style={styles.input}>
          <Text>Passwort:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Password" 
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>
        
        <BasicButton
          onPress={handleSubmit}
          title="Registrieren"
          style={{ width: "50%", marginVertical: 50 }}
        />
        
        <Text>Du hast bereits ein Konto? Hier geht's zum <Link href=".." style={{color: Colors.primary}} >Login</Link>.</Text>

      </View>
    </TouchableWithoutFeedback>
  );
};

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