import { useState } from 'react'
import { Keyboard, TextInput, StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Link } from 'expo-router'
import { useUser } from '../../hooks/useUser'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import Spacer from '../../components/Spacer'
import BasicButton from '../../components/BasicButton'


const Register = () => {

  const [name, setName] = useState ('')
  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState ('')
  const [error, setError] = useState(null)

  const { register } = useUser()

  const handleSubmit = async () => {
    setError(null)  
    try {
        await register(name, email, password)
      } catch (error) {
        setError(error.message)
      }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <Text style={styles.header}>Registrierung</Text>

        <Spacer/>
        
        <KeyboardAvoidingView behavior='padding' style={{width: "100%", alignItems: "center"}}>
          <TextInput
            style={styles.textInput}
            placeholder="Name" 
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email" 
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Passwort" 
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <BasicButton
            onPress={handleSubmit}
            title="Registrieren"
            style={{ width: "50%", marginVertical: 30 }}
          />
          {error && <Text style={styles.error}>{error}</Text>}
        </KeyboardAvoidingView>

        <Text style={styles.link}>Du hast bereits ein Konto? Hier geht's zum <Link href=".." style={{color: Colors.primary}} >Login</Link>.</Text>

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
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    width: "80%",	
    borderRadius: 8,
    borderColor: Colors.outline,
    marginTop: 15
  },
  link: {
    marginTop: 50
  },
  error: {
    color: Colors.error,
    backgroundColor: Colors.errorContainer,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: 8,
    marginHorizontal: 10
  }
})