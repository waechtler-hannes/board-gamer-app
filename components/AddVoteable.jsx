import { useContext, useState, useEffect, useRef } from 'react'
import { StyleSheet, Pressable, Text, View, TextInput, Keyboard } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors';
import { EventsContext } from '../contexts/EventsContext';

const AddVoteable = ({ eventId, type, currentItems }) => {
    const { updateEvent } = useContext(EventsContext);
    const [input, setInput] = useState("");
    const [isPressed, setIsPressed] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!isPressed) setInput("");
    }, [isPressed]);

    useEffect(() => {
        if (isPressed && inputRef.current) {
            const timeout = setTimeout(() => {
                inputRef.current.focus();
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [isPressed]);

    async function uploadVoteable() {
        if (!input.trim() || loading) return;
        setLoading(true);
        const newItem = JSON.stringify({ name: input.trim(), votes: 0 });
        const updatedItems = [...(currentItems || []), newItem];
        await updateEvent(eventId, { [type]: updatedItems });
        setLoading(false);
        setIsPressed(false);
        Keyboard.dismiss();
    }

    return (
        isPressed ? (
            <View style={[styles.container, styles.form]}>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder={type === "foods" ? "Essensvorschlag" : "Spielname"}
                    returnKeyType="done"
                    onSubmitEditing={uploadVoteable}
                    onBlur={() => setIsPressed(false)}
                />
            </View>
        ) : (
            <Pressable style={styles.container} onPress={() => setIsPressed(true)}>
                <View style={styles.getInputButton}>
                    <Ionicons
                        size={20}
                        name="add-circle-outline"
                        color={Colors.primary}
                    />
                    <Text style={{color: Colors.primary}}>
                        {type === "foods" ? "Essen hinzufügen" : "Spiel hinzufügen"}
                    </Text>
                </View>
            </Pressable>
        )
    )
}

export default AddVoteable

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
    getInputButton: {
        flexDirection: "row",
        gap: 5,
        alignSelf: "center",
        marginVertical: 8
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.outline,
        padding: 8,
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