import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import Animated, { interpolate, measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import { useRatings } from '../hooks/useRatings'
import { useUser } from '../hooks/useUser'
import BasicButton from './BasicButton'
import HostIconCircle from './HostIconCircle'
import Spacer from './Spacer'
import StarRating from './StarRating'

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

  const [ratingsInput, setRatingsInput] = useState({ food: 0, host: 0, general: 0 });
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const { ratingsByEvent, fetchRatings, createRating } = useRatings();
  const eventRatings = ratingsByEvent[value.$id] || [];

  useEffect(() => { fetchRatings(value.$id); }, [submitted, value.$id]);

  const average = eventRatings.length
    ? ratingFields.reduce((acc, { key }) => ({
        ...acc,
        [key]: (eventRatings.reduce((sum, r) => sum + (r[`${key}Rating`] || 0), 0) / eventRatings.length).toFixed(1)
      }), {})
    : null;

  const hasRated = user && eventRatings.some(r => r.userId === user.$id);

  const handleRatingChange = (key, val) => setRatingsInput(r => ({ ...r, [key]: val }));

  async function handleSave() {
    if (!user || loading) return;
    setLoading(true);
    try {
      await createRating({
        eventId: value.$id,
        userId: user.$id,
        userName: user.name,
        foodRating: ratingsInput.food,
        hostRating: ratingsInput.host,
        generalRating: ratingsInput.general,
        comment,
        createdAt: new Date().toISOString()
      });
      setRatingsInput({ food: 0, host: 0, general: 0 });
      setComment('');
      setSubmitted(!submitted);
    } catch {
      alert('Fehler beim Speichern der Bewertung');
    }
    setLoading(false);
  }

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
          <View>
            {hasRated ? (
              <View style={[styles.block, styles.summaryBlock]}>
                <Spacer height={15} />
                <Text style={styles.summaryTitle}>Zusammenfassung des Abends:</Text>
                {average ? (
                  <>
                    {ratingFields.map(({ key, label }) => (
                      <View key={key} style={styles.ratingRow}>
                        <Text style={styles.ratingLabel}>{label}</Text>
                        <StarRating rating={Number(average[key])} size={22} readonly starColor={Colors.primary} emptyStarColor={Colors.primary} />
                        <Text style={styles.ratingValue}>({average[key]})</Text>
                      </View>
                    ))}
                    <Text style={styles.ratingCount}>({eventRatings.length} Bewertungen)</Text>
                  </>
                ) : (
                  <Text style={styles.noRatings}>Keine Bewertungen vorhanden.</Text>
                )}
                <Text style={styles.commentsTitle}>Kommentare</Text>
                {eventRatings.filter(r => r.comment?.trim()).length === 0 ? (
                  <Text style={styles.noComments}>Keine Kommentare vorhanden.</Text>
                ) : (
                  eventRatings.filter(r => r.comment?.trim()).map((r, idx) => (
                    <View key={r.$id || idx} style={styles.commentBox}>
                      <Text style={styles.commentText}>{r.comment}</Text>
                      <Text style={styles.commentMeta}>
                        {r.userName || 'Unbekannt'},{' '}
                        {r.createdAt ? new Date(r.createdAt).toLocaleString('de-DE', {
                          day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        }) : ''}
                      </Text>
                    </View>
                  ))
                )}
              </View>
            ) : (
              <>
                <View style={[styles.block, styles.noBorder]}>
                  <Spacer height={15} />
                  <Text style={styles.bold}>Wie hat dir der Abend gefallen?</Text>
                  <Text>Bitte bewerte das Essen, den Gastgeber sowie die allgemeine Stimmung des Abends:</Text>
                </View>
                <Spacer height={10} />
                {ratingFields.map(({ key, label }) => (
                  <View style={[styles.row, styles.block]} key={key}>
                    <Text style={styles.bold}>{label}</Text>
                    <StarRating rating={ratingsInput[key]} onChange={v => handleRatingChange(key, v)} size={20} />
                  </View>
                ))}
                <View style={styles.block}>
                  <Text>Kommentar</Text>
                  <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={3}
                    textAlignVertical='top'
                    value={comment}
                    onChangeText={setComment}
                  />
                </View>
                <View style={[styles.row, styles.buttonRow]}>
                  <BasicButton
                    onPress={() => {
                      setRatingsInput({ food: 0, host: 0, general: 0 });
                      setComment('');
                      open.value = false;
                      setIsOpen(false);
                    }}
                    title={"Abbrechen"}
                    theme="white"
                  />
                  <BasicButton
                    onPress={handleSave}
                    disabled={loading}
                    title={loading ? "Speichert..." : "Speichern"}
                  />
                </View>
              </>
            )}
          </View>
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
  commentText:{
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