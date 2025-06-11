import { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback, View, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

//Hooks
import { useEvents } from '../../hooks/useEvents'
import { useHosts } from '../../hooks/useHosts'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import DatePickerField from '../../components/DatePickerField'
import TimePickerField from '../../components/TimePickerField'
import HostDropdown from '../../components/HostDropdown'

const Edit = () => {
  const { id } = useLocalSearchParams();
  const { events, updateEvent } = useEvents();
  const event = events.find(e => e.$id === id);
  const { hosts } = useHosts();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [host, setHost] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!date.trim() || !time.trim() || !host.trim()) return;
    setLoading(true);
    const eventDate = new Date(`${date.split('.').reverse().join('-')}T${time}`);
    await updateEvent(id, {
      datetime: eventDate,
      host,
      description: description.trim() ? description : "Es wurde keine Beschreibung angegeben."
    });
    setLoading(false);
    router.replace('/events');
  };

  useEffect(() => {
    if (event) {
      const d = new Date(event.datetime);
      const dateStr = d.toLocaleDateString('de-DE');
      const timeStr = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false });
      setDate(dateStr);
      setTime(timeStr);
      setHost(event.host?.$id || "");
      setDescription(event.description || "");
    }
  }, [event]);

  const selectedHost = hosts.find(h => h.$id === host)
  const address = selectedHost ? `${selectedHost.street} ${selectedHost.housenumber}, ${selectedHost.postalcode} ${selectedHost.city}` : ""

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: '100%' }}>
            <DatePickerField value={date} setValue={setDate} style={styles} />
            <TimePickerField value={time} setValue={setTime} style={styles} />
            <HostDropdown value={host} setValue={setHost} style={styles} />

            <Text style={styles.heading}>Ort</Text>
            <TextInput
              style={[styles.input, { backgroundColor: "#eee", color: Colors.placeholder }]}
              value={address}
              editable={false}
              placeholder="Standort des Hosts"
              placeholderTextColor={Colors.placeholder}
            />

            <Text style={styles.heading}>Beschreibung</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              multiline
              numberOfLines={3}
              textAlignVertical='top'
              value={description}
              onChangeText={setDescription}
              placeholder="Beschreibung"
              placeholderTextColor={Colors.placeholder}
            />
          </View>
          <View style={styles.buttongroup}>
            <BasicButton onPress={() => router.navigate('..')} title="Abbrechen" theme="white" />
            <BasicButton onPress={handleSubmit} disabled={loading} title={loading ? "Speichert..." : "Speichern"} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Edit

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
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10
  },
  input: {
    marginVertical: 6,
    borderColor: Colors.outline,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 9,
    flexDirection: "row",
    alignItems: "center"
  },
  inputActive: {
    borderColor: Colors.primary
  },
  inputText: {
    flex: 1,
    color: "black",
    fontSize: 14
  },
  buttongroup: {
    flexDirection: "row",
    width: '100%',
    marginTop: 30,
    gap: 15,
    justifyContent: "flex-end"
  }
})