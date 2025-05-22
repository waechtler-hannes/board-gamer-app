import { StyleSheet, Text, View } from 'react-native'
import VoteButton from './VoteButton'

const VoteSection = ({ value, eventId, type }) => {
  const items = Array.isArray(value)
    ? value.map(v => (typeof v === "string" ? JSON.parse(v) : v))
    : [];

  const sortedItems = [...items].sort((a, b) => b.votes - a.votes);

  return (
    <View style={styles.voteBlock}>
      {sortedItems.map((v, i) => {
        const originalIndex = items.findIndex(item => item.name === v.name);
        return (
          <View key={i} style={styles.voteRow}>
            <Text>{i + 1}. {v.name}</Text>
            <VoteButton
              votes={v.votes}
              eventId={eventId}
              type={type}
              index={originalIndex}
              items={value}
            />
          </View>
        );
      })}
    </View>
  )
}

export default VoteSection

const styles = StyleSheet.create({
  voteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  voteBlock: {
    marginBottom: 5
  }
})