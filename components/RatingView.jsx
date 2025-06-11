import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { interpolate, measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

//Hooks
import { useRatings } from '../hooks/useRatings'
import { useUser } from '../hooks/useUser'

//Konstanten
import { Colors } from '../constants/Colors'

//Eigene Komponenten
import HostIconCircle from './HostIconCircle'
import RatingSummaryBlock from './RatingSummaryBlock'
import RatingInputBlock from './RatingInputBlock'

const ratingFields = [
  { key: 'food', label: 'Essen' },
  { key: 'host', label: 'Gastgeber' },
  { key: 'general', label: 'Allgemein' },
];

const RatingView = ({ value }) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() => open.value ? withTiming(1) : withTiming(0));
  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [0, heightValue.value])
  }));

  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const { ratingsByEvent, fetchRatings, createRating } = useRatings();
  const eventRatings = ratingsByEvent[value.$id] || [];
  const hasRated = user && eventRatings.some(r => r.userId === user.$id);

  useEffect(() => { fetchRatings(value.$id); }, [value.$id]);
  useEffect(() => {
    if (isOpen) {
      runOnUI(() => { "worklet"; heightValue.value = measure(listRef).height; })();
    }
  }, [eventRatings.length, hasRated, isOpen]);

  return (
    <View style={styles.card}>
      <Pressable
        style={[styles.row, styles.header]}
        onPress={() => {
          if (heightValue.value === 0) runOnUI(() => { "worklet"; heightValue.value = measure(listRef).height; })();
          open.value = !open.value;
          setIsOpen(prev => !prev);
        }}
      >
        <HostIconCircle hostName={value.host.name} />
        <View style={styles.flex1}>
          <Text style={styles.bold}>
            {new Date(value.datetime).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
          </Text>
          <Text>{value.host.name}</Text>
        </View>
        <Ionicons
          size={24}
          name={hasRated ? "checkmark-circle" : "star-outline"}
          color={Colors.primary}
        />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.absFullWidth}>
          {hasRated ? (
            <RatingSummaryBlock
              eventRatings={eventRatings}
              ratingFields={ratingFields}
              styles={styles}
            />
          ) : (
            <RatingInputBlock
              eventId={value.$id}
              user={user}
              createRating={createRating}
              ratingFields={ratingFields}
              styles={styles}
              onCancel={() => {
                open.value = false
                setIsOpen(false)
              }}
              fetchRatings={fetchRatings}
            />
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default RatingView

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderColor: Colors.outline,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    overflow: "hidden"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  header: {
    padding: 20,
    paddingRight: 24
  },
  block: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    justifyContent: 'space-between'
  },
  bold: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
    color: Colors.text
  },
  input: {
    marginTop: 7,
    height: 80,
    borderColor: Colors.outline,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 5,
    padding: 10
  },
  buttonRow: {
    width: '90%',
    marginVertical: 20,
    gap: 15,
    justifyContent: "flex-end"
  },
  flex1: { flex: 1 },
  absFullWidth: {
    position: "absolute",
    top: 0,
    width: "100%"
  },
  summaryBlock: {
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    borderRadius: 10,
    width: '100%'
  },
  summaryTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
    color: Colors.text
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  ratingLabel: {
    width: 90,
    color: Colors.text
  },
  ratingValue: {
    marginLeft: 8,
    color: Colors.textSecondary,
    fontSize: 15
  },
  ratingCount: {
    marginTop: 10,
    color: Colors.grey,
    fontSize: 13
  },
  noRatings: {
    color: Colors.text
  },
  commentsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    color: Colors.text
  },
  noComments: {
    color: Colors.grey
  },
  commentBox: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    width: '100%'
  },
  commentText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10
  },
  commentMeta: {
    color: Colors.surface,
    fontSize: 13,
    textAlign: 'right'
  },
  noBorder: {
    borderTopWidth: 0
  }
});