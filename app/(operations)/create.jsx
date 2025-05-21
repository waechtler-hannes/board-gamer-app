import { useState } from 'react'
import { Keyboard, StyleSheet, Text, ScrollView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useRouter } from 'expo-router'
import { useEvents } from '../../hooks/useEvents'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'

const Create = () => {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [host, setHost] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const { createEvent } = useEvents()
  const router = useRouter()

  const handleSubmit = async () => {
    if(!date.trim() || !time.trim() || !host.trim() || !description.trim()) return
    setLoading(true)
    await createEvent({
      datetime: `${date} ${time}`,
      host,
      description
    })
    setDate("")
    setTime("")
    setHost("")
    setDescription("")
    router.replace('/events')
    setLoading(false)
  }

  const hostData = [
    { label: 'Max Mustermann', value: 'max' },
    { label: 'Erika Mustermann', value: 'erika' },
    { label: 'Hans Müller', value: 'hans' },
  ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={{width: "100%", alignItems: "center"}}>
          <View style={styles.editSection}>

            <Text style={styles.heading}>Datum</Text>
            <TextInput style={styles.textInput} value={date} onChangeText={setDate}/>

            <Text style={styles.heading}>Uhrzeit</Text>
            <TextInput style={styles.textInput} value={time} onChangeText={setTime}/>

            <Text style={styles.heading}>Host</Text>
            <Dropdown
              style={[styles.textInput, isFocus && { borderColor: Colors.primary }]}
              data={hostData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Host auswählen' : '...'}
              value={host}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setHost(item.value); // <-- Das ist wichtig!
                setIsFocus(false);
              }}
            />

            <Text style={styles.heading}>Ort</Text>
            <TextInput style={[styles.textInput, {backgroundColor: "#eee", color: "#888"}]} value={'Musterstr. 1, 00000 Musterstadt'} editable={false}/> 

            <Text style={styles.heading}>Beschreibung</Text>
            <TextInput style={[styles.textInput, {height: 80}]} multiline numberOfLines={3} textAlignVertical='top' value={description} onChangeText={setDescription}/>
          </View>
          <View style={styles.buttongroup}>
            <BasicButton
              onPress={() => router.navigate('..')}
              title={"Abbrechen"}
              theme="white"
            />
            <BasicButton
              onPress={handleSubmit}
              disabled={loading}
              title={loading ? "Speichert..." : "Speichern"}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: Colors.surface,
    borderColor: Colors.outline,
    margin: 15,
    padding: 45,
    borderWidth: 1,
    borderRadius: 10
  },
  editSection: {
    width: '100%'
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10
  },
  textInput: {
    marginVertical: 6,
    borderColor: Colors.outline,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 9
  },
  buttongroup: {
    flexDirection: "row",
    width: '100%',
    marginTop: 30,
    gap: 15,
    justifyContent: "flex-end"
  },
})