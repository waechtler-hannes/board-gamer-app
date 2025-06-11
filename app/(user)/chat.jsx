import { useState, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlashList } from '@shopify/flash-list';

//Konstanten
import { Colors } from '../../constants/Colors';

//Hooks
import { useUser } from '../../hooks/useUser';
import { useChat } from '../../hooks/useChat';

//Eigene Komponenten
import HostIconCircle from '../../components/HostIconCircle';

const formatTime = dateStr =>
  new Date(dateStr).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

const Chat = () => {
  const { messages, sendMessage, flatListRef } = useChat();
  const { user } = useUser();
  const [input, setInput] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  useEffect(() => {
    if (flatListRef?.current && messages.length)
      flatListRef.current.scrollToIndex({ index: messages.length - 1, animated: true });
  }, [messages, isKeyboardVisible]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput('');
  };

  const renderItem = ({ item }) => {
    const isOwn = item.userId === user?.$id;
    return (
      <View style={[styles.msgRow, isOwn ? styles.msgRowOwn : styles.msgRowOther]}>
        {!isOwn && (
          <HostIconCircle hostName={item.userName} style={styles.avatar}/>
        )}
        <View style={[
          styles.bubble,
          isOwn ? styles.bubbleOwn : styles.bubbleOther
        ]}>
          {!isOwn && <Text style={styles.userName}>{item.userName}</Text>}
          <View style={styles.msgTextRow}>
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
          <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 120}
        enabled={isKeyboardVisible}
      >
        <View style={styles.container}>
          <FlashList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.$id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            estimatedItemSize={80}
          />
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Nachricht eingeben.."
              placeholderTextColor={Colors.placeholder}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Ionicons name="send" size={22} color={Colors.surface} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContent: {
    padding: 10
  },
  msgTextRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  msgText: {
    fontSize: 15,
    color: Colors.text,
    flexShrink: 1,
    marginRight: 10
  },
  timeText: {
    color: Colors.grey,
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 2
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  msgRowOwn: {
    justifyContent: 'flex-end'
  },
  msgRowOther: {
    justifyContent: 'flex-start'
  },
  avatar: {
    width: 32,
    height: 32,
    borderWidth: 1,
    marginRight: 8
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 12,
    padding: 10,
    minHeight: 40,
    justifyContent: 'center'
  },
  bubbleOther: {
    backgroundColor: Colors.surface,
    borderColor: Colors.outline,
    borderWidth: 1,
    alignItems: 'flex-start'
  },
  bubbleOwn: {
    backgroundColor: Colors.primaryContainer,
    alignItems: 'flex-end'
  },
  userName: {
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 2,
    fontSize: 13
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: 'transparent'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 20,
    padding: 10,
    backgroundColor: Colors.surface,
    color: Colors.text,
    marginRight: 8
  },
  sendBtn: {
    backgroundColor: Colors.primaryContainer,
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
});