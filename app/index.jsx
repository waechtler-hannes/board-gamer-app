import { StyleSheet, View, Image } from 'react-native'
import { Link } from 'expo-router'

//Konstanten
import { Colors } from '../constants/Colors'
import Logo from '../assets/img/logo.png'

//Eigene Komponenten
import Spacer from '../components/Spacer'

const index = () => {
  return (
    <View style={styles.container}>
              <View style={{alignItems: 'center'}}>
              <Image source={Logo}/>
              </View>

      <Spacer height={20}/>
      <Link style={styles.link} href="/events" >Events</Link>
      <Link style={styles.link} href="/ratings" >Bewertung</Link>
      <Spacer height={20}/>

      <Link style={styles.link} href="/register" >Registrierung</Link>
      <Link style={styles.link} href="/login" >Login</Link>
      <Link style={styles.link} href="/profile" >Profil</Link>
      <Link style={styles.link} href="/create" >Event erstellen</Link>
      <Link style={styles.link} href="/edit" >Event bearbeiten</Link>
      <Link style={styles.link} href="/chat" >Chat</Link>

    </View>
  )
}

export default index

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    link: {
        color: Colors.primary,
        margin: 10,
        fontSize: 20,
    }
})