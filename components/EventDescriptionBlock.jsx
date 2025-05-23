import { Text, View } from 'react-native'

const EventDescriptionBlock = ({ value, styles }) => (
  <View style={styles.block}>
    <Text style={styles.boldText}>Beschreibung</Text>
    <Text>{value.description}</Text>
  </View>
)

export default EventDescriptionBlock