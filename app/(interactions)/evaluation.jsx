import { StyleSheet, KeyboardAvoidingView, FlatList, Platform } from 'react-native'
import { useEvents } from '../../hooks/useEvents'

//Eigene Komponenten
import EvaluationView from '../../components/EvaluationView'

const Evaluation = () => {

  const { events } = useEvents()
  const now = new Date();
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
          <EvaluationView value={item}/>
        )}
      />
    </KeyboardAvoidingView>
  )
}
  
export default Evaluation

const styles = StyleSheet.create({
  list: {
    padding: 10
  }
})