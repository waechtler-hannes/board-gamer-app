import { Text, View } from 'react-native'

const EventHeader = ({ value, now, styles }) => {
  const date = new Date(value.datetime)
  date.setHours(date.getHours() - 2)
  const diffMs = date - now
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  return (
    <View style={styles.headContent}>
      <Text>
        <Text style={styles.boldText}>
          {date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
        </Text>
        {' '}
        {diffDays >= 1
          ? ` (in ${diffDays} Tag${diffDays === 1 ? '' : 'en'})`
          : diffHours >= 1
            ? ` (in ${diffHours} Stunde${diffHours === 1 ? '' : 'n'})`
            : ' (weniger als 1 Stunde)'
        }
      </Text>
      <Text>{value.host.name}</Text>
    </View>
  )
}

export default EventHeader