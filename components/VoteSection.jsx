import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VoteButton from './VoteButton'

const VoteSection = ({value}) => {
  return (
    <View style={styles.voteBlock}>
        {value.sort((a, b) => {
            return b.votes - a.votes
        }).map((v, i) => {
            return <View key={i} style={styles.voteRow}>
                <Text>{i+1}. {v.voteable}</Text>
                <VoteButton votes={v.votes}></VoteButton>
            </View>
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