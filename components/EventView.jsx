import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const EventView = ({date, host, editable}) => {
  return (
    <View style={styles.card}>
        <Ionicons
            size={55}
            name="person-circle"
            color={Colors.primaryContainer}
        />
        <View style={styles.eventContent}>
            <Text style={styles.eventHeading}>{date}</Text>
            <Text>{host}</Text>
        </View>
        {editable && <Ionicons
            size={24}
            name="create"
            style={{padding: 10}}
            color={Colors.grey}
            onPress={() => router.navigate('/edit')}
        />}
    </View>
  )
}

export default EventView

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        margin: 10,
        padding: 12,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.outline,
    },
    eventContent: {
        gap: 5,
        flexGrow: 1
    },
    eventHeading: {
        fontWeight: "bold"
    }
})