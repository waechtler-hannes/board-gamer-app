import React from 'react'
import { useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useUser } from '../../hooks/useUser'
import { AdvancedCheckbox } from 'react-native-advanced-checkbox'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import UserInitialCircle from '../../components/UserInitialCircle'
import Spacer from '../../components/Spacer'

const Profile = () => {

  const { logout, user } = useUser()
  const [checked, setChecked] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

      <Spacer height={5}/>
      <UserInitialCircle/>
      <Spacer height={5}/>

      <View style={styles.contentSection}>
            <Text style={styles.heading}>Name</Text>
            <Text style={styles.data}>{user.name}</Text>
        </View>

        <View style={styles.contentSection}>
            <Text style={styles.heading}>Email</Text>
            <Text style={styles.data}>{user.email}</Text>
        </View>

        <View style={styles.addressSection}>
          <Text style={styles.heading}>Adresse</Text>
          <View>
            <Text style={styles.text}>Straße</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View>
            <Text style={styles.text}>Postleitzahl</Text>
            <TextInput style={styles.textInput}/>
          </View>
          <View>
            <Text style={styles.text}>Ort</Text>
            <TextInput style={styles.textInput}/>
          </View>

          <AdvancedCheckbox
            value={checked}
            onValueChange={setChecked}
            label="Adresse ist für andere sichtbar"
            checkedColor={Colors.primary}
            uncheckedColor={Colors.outline}
            size={14}
          />
        </View>

        <View style={styles.buttongroup}>
          <BasicButton
            onPress={() => router.navigate('..')}
            title={"Abbrechen"}
            theme="white"
          />
          <BasicButton
            onPress={() => router.navigate('..')}
            title={"Speichern"}
          />
        </View>

        <TouchableOpacity style={styles.logoutBlock} onPress={logout}>
          <Ionicons
            size={24}
            name="log-out-outline"
            color={Colors.error}
          />
          <Text style={styles.logout}>Abmelden</Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderColor: Colors.outline,
    margin: 15,
    marginBottom: 50,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10
  },
  contentSection: {
    flexDirection: "row",
    width: '90%'
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    width: 70
  },
  data: {
    color: Colors.primary,
  },
  addressSection: {
    flexDirection: "column",
    width: '90%',
    gap: 7
  },
  textInput: {
    marginTop: 0,
    height: 40,
    borderColor: Colors.outline,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 5
  },
  text: {
    color: Colors.Text,
    opacity: 0.5
  },
  buttongroup: {
    flexDirection: "row",
    width: '90%',
    marginTop: 10,
    gap: 15,
    justifyContent: "flex-end"
  },
  logoutBlock: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: Colors.outline,
    paddingTop: 8,
    paddingHorizontal: 110,
    alignItems: 'center',
    gap: 5,
    marginTop: 20
  },
  logout:  {
    color: Colors.error,
    fontSize: 18
  }
})