import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import Animated, { Extrapolation, interpolate, measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const Accordion = ({value}) => {
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
        style={styles.titleContainer}
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
        <Text style={styles.textTitle}>{value.title}</Text>
        <Ionicons
          size={55}
          name="person-circle"
          color={Colors.primaryContainer}
        />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.contentContainer}>
          <View>
            <Text>{value.content}</Text>
            <Text>{value.eva}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default Accordion

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#698",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#444",
    overflow: "hidden"
  },
  titleContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textTitle: {
    fontSize: 16,
    color: "black"
  },
  contentContainer: {
    position: "absolute",
    top: 0,
    width: "100%"
  }
})