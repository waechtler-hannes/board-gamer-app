import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import EventView from '../../components/EventView'
import BasicButton from '../../components/BasicButton'
import Data from '../../assets/data'
import Accordion from '../../components/Accordion'

const Events = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        {Data.map((value, index) => {
          return <Accordion value={value} key={index} />
        })}
        <EventView
          date={"25. April 2025"}
          host={"Erik"}
          editable={true}
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