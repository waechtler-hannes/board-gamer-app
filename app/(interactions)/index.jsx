import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import EventView from '../../components/EventView'
import BasicButton from '../../components/BasicButton'

const Events = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <EventView
          date={"25. April 2025"}
          host={"Erik"}
          editable={true}
        />
        <EventView
          date={"02. Mai 2025"}
          host={"Sarah"}
          editable={false}
        />
      </ScrollView>
      <BasicButton
        onPress={() => router.navigate('/create')}
        title="Event erstellen"
      />
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