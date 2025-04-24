import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native'
import { Colors } from "../../constants/Colors"
import React from 'react'
import UserImage from "../../assets/img/user.png"
import EditIcon from "../../assets/img/edit.png"
import { router } from 'expo-router'

const Events = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <Image style={styles.userIcon} source={UserImage}></Image>
          <View style={styles.eventContent}>
            <Text style={styles.eventHeading}>25.April 2025</Text>
            <Text>Host: Erik</Text>
          </View>
          <Image source={EditIcon}></Image>
        </View>
        <View style={styles.card}>
          <Image style={styles.userIcon} source={UserImage}></Image>
          <View style={styles.eventContent}>
            <Text style={styles.eventHeading}>25.April 2025</Text>
            <Text>Host: Erik</Text>
          </View>
          <Image source={EditIcon}></Image>
        </View>
      </ScrollView>
      <Pressable
        style={({pressed}) => [styles.btn, pressed && styles.pressed]}
        onPress={() => router.navigate('/create')}
      >
        <Text style={styles.btnText}>Event erstellen</Text>
      </Pressable>
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
  },
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
  userIcon: {
    height: 55,
    width: 55
  },
  eventContent: {
    gap: 5,
    flexGrow: 1
  },
  eventHeading: {
    fontWeight: "bold"
  },
  btnText: {
    color: Colors.primaryText
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    marginVertical: 20,
    marginHorizontal: 80,
    borderRadius: 30,
    alignItems: "center"
  },
  pressed: {
    opacity: 0.8
  }
})