import { Pressable, StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import Animated, { Extrapolation, interpolate, measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { router } from 'expo-router'
import HostIconCircle from '../components/HostIconCircle'
import EventHeader from './EventHeader'
import EventTimeBlock from './EventTimeBlock'
import EventDescriptionBlock from './EventDescriptionBlock'
import EventLocationBlock from './EventLocationBlock'
import EventVoteBlock from './EventVoteBlock'
import EventVotingInfo from './EventVotingInfo'

const EventView = ({ value }) => {
  const [now, setNow] = useState(new Date())

  const eventDate = new Date(value.datetime)
  eventDate.setHours(eventDate.getHours() - 2)
  const votingEnd = new Date(eventDate.getTime())
  votingEnd.setDate(votingEnd.getDate() - 2)
  const votingOver = now > votingEnd

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(interval)
  }, [])

  const listRef = useAnimatedRef()
  const heightValue = useSharedValue(0)
  const open = useSharedValue(false)
  const progress = useDerivedValue(() => open.value ? withTiming(1) : withTiming(0))
  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [0, heightValue.value],
      Extrapolation.CLAMP
    )
  }))

  useEffect(() => {
    if (open.value) {
      runOnUI(() => {
        "worklet"
        heightValue.value = measure(listRef).height
      })()
    }
  }, [value.games?.length, value.foods?.length, votingOver])

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.headContainer}
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              "worklet"
              heightValue.value = measure(listRef).height
            })()
          }
          open.value = !open.value
        }}
      >
        <HostIconCircle hostName={value.host.name} />
        <EventHeader value={value} now={now} styles={styles} />
        <Ionicons
          size={24}
          name="create"
          style={styles.icon}
          onPress={() => router.navigate('/edit')}
        />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.absFullWidth}>
          <View>
            <EventTimeBlock value={value} styles={styles} />
            <EventDescriptionBlock value={value} styles={styles} />
            <EventLocationBlock value={value} styles={styles} />
            <EventVoteBlock value={value} type="games" votingOver={votingOver} styles={styles} />
            <EventVoteBlock value={value} type="foods" votingOver={votingOver} styles={styles} />
            <EventVotingInfo votingOver={votingOver} votingEnd={votingEnd} now={now} styles={styles} />
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
    padding: 20,
    paddingRight: 24,
    gap: 15
  },
  headContent: {
    gap: 5,
    flexGrow: 1
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5
  },
  icon: {
    color: Colors.grey
  },
  absFullWidth: {
    position: "absolute",
    top: 0,
    width: "100%"
  },
  block: {
    borderTopWidth: 1,
    borderColor: Colors.outline,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 1
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  smallCenter: {
    fontSize: 11,
    alignSelf: "center"
  }
})