import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import Animated, { Extrapolation, interpolate, measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';
import VoteSection from './VoteSection';
import AddVoteableButton from './AddVoteable';

const EventView = ({value}) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() => open.value ? withTiming(1) : withTiming(0))
  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0,1],
      [0, heightValue.value],
      Extrapolation.CLAMP
    )
  }))
  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.headContainer}
        onPress={() => {
          if(heightValue.value === 0) {
            runOnUI(() => {
              "worklet";
              heightValue.value = measure(listRef).height;
            })();
          }
          open.value = !open.value;
        }}
      >
        <Ionicons
          size={55}
          name={value.icon}
          style={styles.headProfileIcon}
          />
        <View style={styles.headContent}>
          <Text style={styles.headDate}>{value.date}</Text>
          <Text>{value.host}</Text>
        </View>
        {value.editable && <Ionicons
          size={24}
          name="create"
          style={styles.icon}
          onPress={() => router.navigate('/edit')}
        />}
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.contentContainer}>
          <View style={styles.mainContent}>
            <View style={styles.block}>
              <Text style={styles.blockHeading}>Beschreibung</Text>
              <Text>{value.description}</Text>
            </View>
            <View style={styles.block}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.blockHeading}>Ort</Text>
                  <Text>
                    {value.location.street} {value.location.housenumber}, {value.location.postalcode} {value.location.city}
                  </Text>                  
                </View>
                <Ionicons
                  onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${value.location.street}+${value.location.housenumber}+${value.location.postalcode}+${value.location.city}`)}
                  name="map"
                  size={24}
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={styles.block}>
              <Text style={styles.blockHeading}>Spiel</Text>
              <VoteSection value={value.games}/>
              <AddVoteableButton></AddVoteableButton>
            </View>
            <View style={styles.block}>
              <Text style={styles.blockHeading}>Essen</Text>
              <VoteSection value={value.foods}/>
              <AddVoteableButton></AddVoteableButton>
            </View>
            <View style={styles.block}>
              <Text style={styles.voteEnd}>Ende der Abstimmung: 22. April 2025</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default EventView

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderColor: Colors.outline,
    overflow: "hidden",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  headContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingRight: 24,
    gap: 10
  },
  headProfileIcon: {
    color: Colors.primaryContainer
  },
  headContent: {
    gap: 5,
    flexGrow: 1
  },
  headDate: {
    fontWeight: "bold"
  },
  icon: {
    color: Colors.grey
  },
  contentContainer: {
    position: "absolute",
    top: 0,
    width: "100%"
  },
  mainContent: {
    marginTop: 1
  },
  block: {
    borderTopWidth: 1,
    borderColor: Colors.outline,
    paddingVertical: 8,
    paddingHorizontal: 24
  },
  blockHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  voteEnd: {
    fontSize: 11,
    alignSelf: "center"
  }
})