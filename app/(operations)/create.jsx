import React from 'react'
import { Keyboard, StyleSheet, Text, ScrollView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'
import { router } from 'expo-router'
import { CheckboxGroup, AdvancedCheckbox } from 'react-native-advanced-checkbox'
import { useState } from 'react'


//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import Spacer from '../../components/Spacer'

const Create = () => {
  const [checkedEating, setCheckedEating] = useState(false);
  const [checkedGames, setCheckedGames] = useState(false);

  return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
 <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
  
      <View style={styles.container}>

      <Spacer height={5}/>
        <KeyboardAvoidingView behavior='padding' style={{width: "100%", alignItems: "center"}}>
      <View style={styles.editSection}>
            <Text style={styles.heading}>Datum</Text>
            <TextInput style={styles.textInput} marginTop={0}/>

            <Text style={styles.heading}>Uhrzeit</Text>
            <TextInput style={styles.textInput} marginTop={0}/>

            <Text style={styles.heading}>Host</Text>
            <TextInput style={styles.textInput} marginTop={0}/>

            <Text style={styles.heading}>Ort</Text>
            <TextInput height={20} style={styles.textInput} backgroundColor={Colors.primaryContainer} opacity={0.6} padding={10} value={'Musterstr. 1, 00000 Musterstadt'}/> 

            <Text style={styles.heading}>Beschreibung</Text>
            <TextInput style={styles.textInput} height={80} marginTop={0}/>
        </View>
        </KeyboardAvoidingView>

        <View style={styles.checkBox}>
          <AdvancedCheckbox
            value={checkedGames}
            onValueChange={setCheckedGames}
            label="Spielvorschläge erlauben"
            checkedColor={Colors.primary}
            uncheckedColor="#ccc"
            size={14}
          />

          <AdvancedCheckbox
            value={checkedEating}
            onValueChange={setCheckedEating}
            label="Essensvorschläge erlauben"
            checkedColor={Colors.primary}
            uncheckedColor="#ccc"
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

      </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default Create

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
    width: '80%'
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    width: 100,
    marginTop: 10
  },
  data: {
    color: Colors.primary,
  },
  textInput: {
    marginTop: 7,
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
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 5,
    marginTop: 20
  },
  logout:  {
    color: Colors.error,
    fontSize: 18
  },
  editSection: {
    flexDirection: "column",
    width: '80%',
    gap: 5
  },
  checkBox: {
    flexDirection: "column",
    width: '80%',
    marginTop: 10
  }
})