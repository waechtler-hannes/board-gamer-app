import { TextInput, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import Spacer from '../../components/Spacer'
import { Colors } from '../../constants/Colors'

const Register = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrierung</Text>
      <Spacer height={20}/>
      <View>
      <Text style={styles.text}>E-Mail-Adresse</Text>
      <TextInput style={styles.textinput}/>
        <Spacer height={5} />
        <Text style={styles.text}>Passwort</Text>
        <TextInput style={styles.textinput}/>
        <Spacer height={5} />
        <Text style={styles.text}>Neues Passwort bestätigen</Text>
        <TextInput style={styles.textinput}/>
      </View>

      <Pressable style={({pressed}) => [styles.btn, pressed && styles.pressed]}>
      <Text style={styles.btnText}>Registrierung</Text>
      </Pressable>
      <Spacer height={40}/>
      <Text style={{textAlign: 'center', flexDirection: 'row'}}>Du hast bereits ein Konto? Hier geht's zum <Link href="/login" style={{color: Colors.primary}} >Login</Link>.</Text>
      
    </View>
  )
}

export default Register

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
    },
    text: {
        marginLeft: 35,
    },
    btnText: {
        color: Colors.primaryText
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
      },
})