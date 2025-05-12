import React from 'react'
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import HideWithKeyboard from 'react-native-hide-with-keyboard'
import { router } from 'expo-router'

//Eigene Komponenten
import EventData from '../../assets/data/EventData'
import EvaluationView from '../../components/EvaluationView'

//Logik einbauen, dass bei Bewertungen nur Events gelistets sind, deren Datum in der Vergangenheit liegt

const Evaluation = () => {
  const currentDate = new Date();

  const pastEvents = EventData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < currentDate;
  });

  return (
   <View style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardAvoider} behavior="position" keyboardVerticalOffset={100}>
          <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
            {pastEvents.map((value, index) => {
              return <EvaluationView value={value} key={index}/>
            })}
          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    )
  }
  
  export default Evaluation
  
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