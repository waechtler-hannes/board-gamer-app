import { useRef, useState } from 'react'
import { Keyboard, TextInput, StyleSheet, Text, View, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Link } from 'expo-router'

//Hooks
import { useUser } from '../../hooks/useUser.js'

//Konstanten
import { Colors } from '../../constants/Colors.js'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton.jsx'
import Spacer from '../../components/Spacer.jsx'
import Logo from '../../assets/img/logo.png'
import HideWithKeyboard from 'react-native-hide-with-keyboard'

const Index = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useUser()
  const passwordRef = useRef(null)

  const handleSubmit = async () => {
    setError(null)
    try {
      await login(email, password)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <Image source={Logo} style={styles.image}/>
        <KeyboardAvoidingView behavior='padding' style={{width: "100%", alignItems: "center", justifyContent: "center"}}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={Colors.placeholder}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
          />
          <Spacer height={20}/>
          <TextInput
            ref={passwordRef}
            style={styles.textInput}
            placeholder="Passwort"
            placeholderTextColor={Colors.placeholder}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
          <BasicButton
            onPress={handleSubmit}
            title="Login"
            style={{ width: "50%", marginVertical: 30 }}
          />
        </KeyboardAvoidingView>
        {error && <Text style={styles.error}>{error}</Text>}
        <HideWithKeyboard>
          <Text style={styles.link}>Kein Konto? Hier gehts zur <Link href="/register" style={{color: Colors.primary}} >Registrierung</Link>.</Text>
          <Spacer/>
        </HideWithKeyboard>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100
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
    borderColor: Colors.outline,
    color: "black"
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