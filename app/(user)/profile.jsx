import { useEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useUser } from '../../hooks/useUser'
import { useHosts } from '../../hooks/useHosts'

//Konstanten
import { Colors } from '../../constants/Colors'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import UserInitialCircle from '../../components/UserInitialCircle'
import Spacer from '../../components/Spacer'

const Profile = () => {

  const [postalcode, setPostalcode] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [housenumber, setHousenumber] = useState("")
  const [loading, setLoading] = useState(false)

  const { upsertHost, hosts } = useHosts()
  const { logout, user } = useUser()

  useEffect(() => {
    const myHost = hosts.find(h => h.userId === user.$id)
    if (myHost) {
      setPostalcode(myHost.postalcode?.toString() || "")
      setCity(myHost.city || "")
      setStreet(myHost.street || "")
      setHousenumber(myHost.housenumber?.toString() || "")
    }
  }, [hosts, user.$id])

  const handleSubmit = async () => {
    if(!postalcode.trim() || !city.trim() || !street.trim() || !housenumber.trim()) return
    setLoading(true)
    await upsertHost({ // Hier werden alle Daten an die Datenbank gesendet
      postalcode: parseInt(postalcode, 10),
      city,
      street,
      housenumber: parseInt(housenumber, 10),
      name: user.name
    })
    setPostalcode("")
    setCity("")
    setStreet("")
    setHousenumber("")
    router.replace('..')
    setLoading(false)
  }

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
            <Text style={styles.text}>Postleitzahl</Text>
            <TextInput style={styles.textInput} value={postalcode} onChangeText={setPostalcode}/>
          </View>
          <View>
            <Text style={styles.text}>Ort</Text>
            <TextInput style={styles.textInput} value={city} onChangeText={setCity}/>
          </View>
          <View>
            <Text style={styles.text}>Straße</Text>
            <TextInput style={styles.textInput} value={street} onChangeText={setStreet}/>
          </View>
          <View>
            <Text style={styles.text}>Hausnummer</Text>
            <TextInput style={styles.textInput} value={housenumber} onChangeText={setHousenumber}/>
          </View>
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