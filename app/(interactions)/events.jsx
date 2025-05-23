import { StyleSheet, FlatList, KeyboardAvoidingView, Platform, View } from 'react-native'
import HideWithKeyboard from 'react-native-hide-with-keyboard'
import { router } from 'expo-router'
import { useEvents } from '../../hooks/useEvents'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import EventView from '../../components/EventView'

const Events = () => {
  const { events } = useEvents()
  const now = new Date();
  const futureEvents = events.filter(e => new Date(e.datetime) > now);
  const sortedEvents = [...futureEvents].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={140}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={sortedEvents}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <EventView value={item}/>
          )}
        />
        <HideWithKeyboard>
          <View style={styles.buttonContainer}>
            <BasicButton
              onPress={() => router.navigate('/create')}
              title="Event erstellen"
              style={styles.button}
            />
          </View>
        </HideWithKeyboard>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Events

const styles = StyleSheet.create({
  list: {
    padding: 10,
    paddingBottom: 80
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  button: {
    width: "65%",
    alignSelf: "center"
  }
})