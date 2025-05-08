import React, { useState } from 'react'
import { StyleSheet, Pressable, Text, View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors';

const AddVoteable = () => {
    const [isPressed, setIsPressed] = useState(true);
    
    function uploadVoteable() {
        //Funktion, um neues Spiel oder Essen in die Datenbank hochzuladen
        setIsPressed(!isPressed)
    }

    return (
        <Pressable style={styles.container} onPress={() => {setIsPressed(!isPressed)}}> 
            {isPressed ? (
                <View style={styles.getInputButton}>
                    <Ionicons
                        size={20}
                        name="add-circle-outline"
                        color={Colors.primary}
                    />
                    <Text style={{color: Colors.primary}}>Eintrag hinzufügen</Text>
                </View>
            ) : (
                <View style={styles.form}>
                    <TextInput autoFocus={true} style={styles.input}/>
                    <Pressable style={styles.uploadButton} onPress={() => uploadVoteable()}>
                        <Text style={styles.uploadButtonText}>Hinzufügen</Text>
                    </Pressable>
                </View>
            )}
        </Pressable>
    )
}

export default AddVoteable

const styles = StyleSheet.create({
    container: {
        height: 35,
        justifyContent: "center"
    },
    getInputButton: {
        flexDirection: "row",
        gap: 5,
        alignSelf: "center"
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: Colors.outline,
        padding: 0,
        flexGrow: 1
    },
    form: {
        flexDirection: "row",
        gap: 5
    },
    uploadButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 7,
        justifyContent: "center",
        borderRadius: 30
    },
    uploadButtonText: {
        color: Colors.primaryText
    }
})