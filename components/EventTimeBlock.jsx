import { Text, View } from 'react-native'

const EventTimeBlock = ({ value, styles }) => {
  const date = new Date(value.datetime)
  date.setHours(date.getHours() - 2)
  return (
    <View style={styles.block}>
      <Text style={styles.boldText}>Uhrzeit</Text>
      <Text>
        {date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr
      </Text>
    </View>
  )
}

export default EventTimeBlock