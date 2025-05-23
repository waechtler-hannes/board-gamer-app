import { Text, View } from 'react-native'
import VoteSection from './VoteSection'
import AddVoteable from './AddVoteable'

const EventVoteBlock = ({ value, type, votingOver, styles }) => (
  <View style={styles.block}>
    <Text style={styles.boldText}>{type === 'games' ? 'Spiel' : 'Essen'}</Text>
    <VoteSection value={value[type]} eventId={value.$id} type={type} disabled={votingOver} />
    {!votingOver && (
      <AddVoteable eventId={value.$id} type={type} currentItems={value[type]} />
    )}
  </View>
)

export default EventVoteBlock