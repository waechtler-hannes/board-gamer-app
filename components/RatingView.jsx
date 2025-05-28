import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import Animated, { Extrapolation, interpolate, measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';

//Eigene Komponenten
import BasicButton from './BasicButton'
import HostIconCircle from './HostIconCircle'
import Spacer from './Spacer'

// NEU: RatingContext-Hook importieren
import { useRatings } from '../hooks/useRatings'
import { useUser } from '../hooks/useUser'

const StarRating = ({ rating, onChange, size = 20 }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? 'star' : 'star-outline'}
          size={size}
          color={Colors.primary}
          style={{ marginHorizontal: 1 }}
          onPress={() => onChange(star)}
        />
      ))}
    </View>
  );
};

const RatingView = ({value}) => {
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

  // State for star ratings
  const [foodRating, setFoodRating] = useState(0);
  const [hostRating, setHostRating] = useState(0);
  const [generalRating, setGeneralRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const { createRating } = useRatings();
  const { user } = useUser();

  async function handleSave() {
    if (!user || loading) return;
    setLoading(true);
    try {
      await createRating({
        eventId: value.$id,
        userId: user.$id,
        foodRating,
        hostRating,
        generalRating,
        comment,
        createdAt: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })
      });
      setFoodRating(0);
      setHostRating(0);
      setGeneralRating(0);
      setComment('');
    } catch (e) {
      alert('Fehler beim Speichern der Bewertung');
    }
    setLoading(false);
  }

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
        <HostIconCircle
          hostName={value.host.name}
        />
        <View style={styles.headContent}>
          <Text style={styles.headDate}>
            {new Date(value.datetime).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
          </Text>
          <Text>{value.host.name}</Text>
        </View>
        <Ionicons
          size={24}
          name="star-half-outline"
          style={styles.icon}
        />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.contentContainer}>
          <View style={styles.mainContent}>
            <View style={styles.block}>
              <Spacer height={15}/>
              <Text style={styles.blockHeading}>Wie hat dir der Abend gefallen?</Text>
              <Text>Bitte bewerte das Essen, den Gastgeber sowie die allgemeine Stimmung des Abends: </Text>
            </View>

            <Spacer height={10}/>

            <View style={styles.ratingRow}>
              <Text style={styles.blockHeading}>Essen</Text>
              <StarRating rating={foodRating} onChange={setFoodRating} size={20} />
            </View>

            <View style={styles.ratingRow}>
              <Text style={styles.blockHeading}>Gastgeber </Text>
              <StarRating rating={hostRating} onChange={setHostRating} size={20} />
            </View>

            <View style={styles.ratingRow}>
              <Text style={styles.blockHeading}>Allgemein </Text>
              <StarRating rating={generalRating} onChange={setGeneralRating} size={20} />
            </View>

            <View style={styles.block}>
              <Text>Kommentar</Text>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={3}
                textAlignVertical='top'
                value={comment}
                onChangeText={setComment}
              />
            </View>

            <View style={styles.buttongroup}>
              <BasicButton
                onPress={() => router.navigate('..')}
                title={"Abbrechen"}
                theme="white"
              />
              <BasicButton
                onPress={handleSave}
                disabled={loading}
                title={loading ? "Speichert..." : "Speichern"}
              />
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default RatingView

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderColor: Colors.outline,
    overflow: "hidden",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
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
    marginTop: 1,
    marginBottom: 30 // Abstand zu den Buttons
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
  },
  rating: {
    borderColor: Colors.outline,
    paddingVertical: 8,
    paddingHorizontal: 24
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: Colors.outline,
    paddingVertical: 8,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  buttongroup: {
    flexDirection: "row",
    width: '90%',
    marginTop: 10,
    gap: 15,
    justifyContent: "flex-end",
  },
  editSection: {
    gap: 5,
    flex: 1,
    flexDirection: "row",
    width: '50%',
    alignItems: "center",
  },
  textInput: {
    marginTop: 7,
    height: 80,
    borderColor: Colors.outline,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 5,
    padding: 10,
  },
})