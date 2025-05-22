import { StyleSheet, Pressable, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors';
import { EventsContext } from '../contexts/EventsContext';
import { useUser } from '../hooks/useUser';

/**
 * @param {Object} props
 * @param {number} props.votes
 * @param {string} props.eventId
 * @param {string} props.type
 * @param {number} props.index
 * @param {Array} props.items
 */
const VoteButton = ({ votes, eventId, type, index, items }) => {
    const { updateEvent } = useContext(EventsContext);
    const { user } = useUser();
    const userId = user?.$id;
    const item = typeof items[index] === "string" ? JSON.parse(items[index]) : items[index];
    const votedUsers = item.votedUsers || [];
    const hasVoted = votedUsers.includes(userId);

    const [loading, setLoading] = useState(false);

    async function handleVote() {
        if (!userId || loading) return;
        setLoading(true);
        let updatedItem = { ...item };
        if (hasVoted) {
            updatedItem.votes = Math.max(0, updatedItem.votes - 1);
            updatedItem.votedUsers = votedUsers.filter(id => id !== userId);
        } else {
            updatedItem.votes = (updatedItem.votes || 0) + 1;
            updatedItem.votedUsers = [...votedUsers, userId];
        }
        const updatedItems = [...items];
        updatedItems[index] = JSON.stringify(updatedItem);
        await updateEvent(eventId, { [type]: updatedItems });
        setLoading(false);
    }

    return (
        <Pressable onPress={handleVote} disabled={loading}>
            <View style={styles.button}>
                <Ionicons
                    size={20}
                    name={hasVoted ? "thumbs-up" : "thumbs-up-outline"}
                    style={hasVoted ? styles.pressed : undefined}
                />
                <Text style={hasVoted ? styles.pressed : undefined}>{votes}</Text>
            </View>
        </Pressable>
    )
}

export default VoteButton

const styles = StyleSheet.create({
    button: {
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    pressed: {
        color: Colors.primary
    }
})