import React from 'react'
import { Keyboard, StyleSheet, Text, ScrollView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'
import { router } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown'
import { AdvancedCheckbox } from 'react-native-advanced-checkbox'
import { useState } from 'react'


//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import Spacer from '../../components/Spacer'

const Create = () => {
  const [checkedEating, setCheckedEating] = useState(false);
  const [checkedGames, setCheckedGames] = useState(false);

  const hostData = [
    { label: 'Max Mustermann', value: 'max' },
    { label: 'Erika Mustermann', value: 'erika' },
    { label: 'Hans Müller', value: 'hans' },
  ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

  return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
 <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
  
      <View style={styles.container}>

      <Spacer height={5}/>
        <KeyboardAvoidingView behavior='padding' style={{width: "100%", alignItems: "center"}}>
      <View style={styles.editSection}>
            <Text style={styles.heading}>Datum</Text>
            <TextInput style={styles.textInput} marginTop={0} defaultValue="02.06.2025"/>

            <Text style={styles.heading}>Uhrzeit</Text>
            <TextInput style={styles.textInput} marginTop={0} defaultValue="19:00 Uhr"/>

            <Text style={styles.heading}>Host</Text>
                <Dropdown
                  style={[styles.textInput, isFocus && { borderColor: Colors.primary }]}
                  itemTextStyle={{ fontSize: 14}}
                  selectedTextStyle={{ fontSize: 14}}
                  data={hostData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Host auswählen' : '...'} // Platzhalter ausfüllen mit Host, der an der Reihe ist
                  placeholderStyle={{ fontSize: 14}}
                  padding={10}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                    />

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
            uncheckedColor={Colors.outline}
            size={14}
          />

          <AdvancedCheckbox
            value={checkedEating}
            onValueChange={setCheckedEating}
            label="Essensvorschläge erlauben"
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
    borderRadius: 10,
  },
  contentSection: {
    flexDirection: "row",
    width: '80%',
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
    marginBottom: 5,
    padding: 10,
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
  editSection: {
    flexDirection: "column",
    width: '90%',
    gap: 5,
    flex: 1,
  },
  checkBox: {
    flexDirection: "column",
    width: '90%',
    marginTop: 5,
  },
})