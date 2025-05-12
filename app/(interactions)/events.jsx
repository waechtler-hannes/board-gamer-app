import React from 'react'
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import HideWithKeyboard from 'react-native-hide-with-keyboard'
import { router } from 'expo-router'

//Eigene Komponenten
import BasicButton from '../../components/BasicButton'
import EventData from '../../assets/data/EventData'
import EventView from '../../components/EventView'

const Events = () => {
  const currentDate = new Date();

  const futureEvents = EventData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate > currentDate;
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoider} behavior="position" keyboardVerticalOffset={100}>
        <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          {futureEvents.map((value, index) => {
            return <EventView value={value} key={index}/>
          })}
        </ScrollView>
      </KeyboardAvoidingView>
      <HideWithKeyboard>
        <BasicButton
          onPress={() => router.navigate('/create')}
          title="Event erstellen"
          style={{
            width: "65%",
            alignSelf: "center",
            marginVertical: 20
          }}
        />
      </HideWithKeyboard>
    </View>
  )
}

export default Events

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  keyboardAvoider: {
    flex: 1,
    flexDirection: 'column'
  },
  scrollContainer: {
    padding: 10
  }
})