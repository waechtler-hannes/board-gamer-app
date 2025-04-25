import { StyleSheet, Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors';

const VoteButton = ({votes}) => {
    const [isPressed, setIsPressed] = useState(true);
    {/*In der onPress-Methode muss der Vote in die Datenbank übertragen werden, der key dafür kann genau wie "votes" übertragen werden*/}
    return (
        <Pressable onPress={() => {setIsPressed(!isPressed)}}> 
            {isPressed ? (
                <View style={styles.button}>
                    <Ionicons
                        size={20}
                        name="thumbs-up-outline"
                    />
                    <Text>{votes}</Text>
                </View>
            ) : (
                <View style={styles.button}>
                    <Ionicons
                        size={20}
                        name="thumbs-up"
                        style={styles.pressed}
                    />
                    <Text style={styles.pressed}>{votes}</Text>
                </View>
            )}
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