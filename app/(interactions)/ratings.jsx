import { StyleSheet, KeyboardAvoidingView, FlatList, Platform } from 'react-native'

//Hooks
import { useEvents } from '../../hooks/useEvents'

//Eigene Komponenten
import RatingView from '../../components/RatingView'

const Ratings = () => {

  const { events } = useEvents()
  const now = new Date()
  const pastEvents = events.filter(e => new Date(e.datetime) <= now);
  const sortedEvents = [...pastEvents].sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={140}
    >
      <FlatList
        data={sortedEvents}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RatingView value={item}/>
        )}
      />
    </KeyboardAvoidingView>
  )
}
  
export default Ratings

const styles = StyleSheet.create({
  list: {
    padding: 10
  }
})