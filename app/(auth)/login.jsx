import { Keyboard, TextInput, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import Spacer from '../../components/Spacer'
import { Colors } from '../../constants/Colors'
import BasicButton from '../../components/BasicButton'
import Logo from '../../assets/img/logo.png'
import {useState} from 'react'
import {useUser} from '../../hooks/useUser'



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
      <Spacer height={20}/>
      <View style={{alignItems: 'center'}}>
      <Image source={Logo}/>
      </View>
      <Spacer height={20}/>

      <View>
      <Text style={styles.text}>E-Mail-Adresse</Text>
      <TextInput 
        style={styles.textinput} 
        placeholder="Email" 
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}/>

        <Spacer height={5} />
        <Text style={styles.text}>Passwort</Text>
        <TextInput  style={styles.textinput} 
        placeholder="Password" 
        onChangeText={setPassword}
        value={password}
        secureTextEntry/>
      </View>
      <BasicButton
        onPress={handleSubmit} //leitet aktuell zur Profilseite
        title="Login"
      />
      <Spacer height={40}/>
      <Text style={{textAlign: 'center', flexDirection: 'row'}}>Kein Konto? Hier gehts zur <Link href="/register" style={{color: Colors.primary}} >Registrierung</Link>.</Text>

    </View>
    </TouchableWithoutFeedback>
);
};


export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBotton: 30,
        marginTop: 30,
    },
    blockHeading: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
        marginLeft: 35,
      },

    text: {
        marginLeft: 35,
    },
    btnText: {
        color: Colors.primaryText,
    },
    btn: {
      backgroundColor: Colors.primary,
      padding: 15,
      marginVertical: 20,
      marginHorizontal: 80,
      borderRadius: 30,
      alignItems: 'center'
    },
    pressed: {
      opacity: 0.8
    },
    textinput: {
        height: 40,
        borderColor: Colors.outline,
        borderWidth: 1,
        width: '80%',
        marginLeft: 35,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 5,
        marginTop: 5,
      },

})