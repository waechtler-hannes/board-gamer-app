import { Text, View } from 'react-native'

const EventVotingInfo = ({ votingOver, votingEnd, now, styles }) => {
  const diffMs = votingEnd - now
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  let countdown = ''
  if (diffDays >= 1) countdown = `(in ${diffDays} Tag${diffDays === 1 ? '' : 'en'})`
  else if (diffHours >= 1) countdown = `(in ${diffHours} Stunde${diffHours === 1 ? '' : 'n'})`
  else if (diffMinutes >= 1) countdown = `(in ${diffMinutes} Minute${diffMinutes === 1 ? '' : 'n'})`
  else if (diffMs > 0) countdown = '(weniger als 1 Minute)'

  return (
    <View style={styles.block}>
      <Text style={styles.smallCenter}>
        {votingOver
          ? "Die Abstimmung ist zu Ende"
          : `Ende der Abstimmung: ${votingEnd.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })} ${votingEnd.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} ${countdown}`
        }
      </Text>
    </View>
  )
}

export default EventVotingInfo