import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import BasicButton from '../../components/BasicButton'
import EventData from '../../assets/data/EventData'
import EventView from '../../components/EventView'
import HideWithKeyboard from 'react-native-hide-with-keyboard'

const Events = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        {EventData.map((value, index) => {
          return <EventView value={value} key={index} />
        })}
      </ScrollView>
      <HideWithKeyboard>
        <BasicButton
          onPress={() => router.navigate('/create')}
          title="Event erstellen"
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
  scrollContainer: {
    padding: 10
  }
})