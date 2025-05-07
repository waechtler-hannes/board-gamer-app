import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import Spacer from '../../components/Spacer'
import ProfilePicture from '../../components/ProfilePicture'
import { Link, router } from 'expo-router'
import CancelButton from '../../components/CancelButton'
import SubmitButton from '../../components/SubmitButton'
import { Ionicons } from '@expo/vector-icons'
import ProfileData from '../../assets/data/ProfileData'



const Profile = () => {
  return (
    <View 
    style={styles.container}>

      <View style={styles.picture}>
          <Spacer height={20}/>
          <ProfilePicture/>
      </View>
      <Spacer height={20}/>
      <View style={styles.profileBlock}>
          <Text style={styles.blockHeading}>Name</Text>
          <Text style={styles.profileData}>{ProfileData[0].name}</Text>
      </View>
      <View style={styles.profileBlock}>
          <Text style={styles.blockHeading}>E-Mail</Text>
          <Text style={styles.profileData}>value.email</Text> 
      </View>
      <Spacer height={20}/>
      <View style={styles.address}>
        <Text style={styles.blockHeading}>Adresse</Text>
        <Spacer height={5} />
        <Text style={styles.text}>Straße</Text>
        <TextInput style={styles.textinput}/>
        <Spacer height={5} />
        <Text style={styles.text}>Postleitzahl</Text>
        <TextInput style={styles.textinput}/>
        <Spacer height={5} />
        <Text style={styles.text}>Ort</Text>
        <TextInput style={styles.textinput}/>
      </View>

      <View style={styles.buttongroup}>
      <CancelButton
        onPress={() => router.navigate('../profile')} //Hier ist noch keine richtige Funktion hinterlegt
        title="Abbrechen"
      />

            <SubmitButton
        onPress={() => router.navigate('../(interactions)/evaluation')} //Hier ist noch keine richtige Funktion hinterlegt
        title="Speichern"
      />
      </View>

      <View style={styles.logoutBlock}>
      <Ionicons
          size={24}
          name="log-out-outline"
          style={styles.icon}
          onPress={() => router.navigate('/login')}
        />
        <Link style={styles.logout} href="/login">Abmelden</Link>
      </View>

      </View>
      
      
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderColor: Colors.outline,
    overflow: "hidden",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  picture: {
    alignItems: 'center',
  },
  profileBlock: {
    flexDirection: "row",
    gap: 20,
  },
  profileData: {
    color: Colors.primary,
  },
  blockHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 35,
  },
  address: {
    flexDirecton: "column",
  },
  btnText: {
    color: 'white',
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
  text: {
    marginLeft: 35,
    marginBottom: 5,
    color: Colors.Text,
    opacity: 0.5,
  },
  buttongroup: {
    flexWrap: 'wrap',
    flexDirection: "row",
    alignItems: 'center',
    gap: 15,
    marginLeft: 35,
    width: '80%',
    justifyContent: 'flex-end',
  },
  logoutBlock: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: Colors.outline,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 20,
  },
  icon: {
    color: Colors.error,
    alignItems: 'center',
    fontSize: 18,
  },
  logout:  {
    color: Colors.error,
    fontSize: 18,
  }
})