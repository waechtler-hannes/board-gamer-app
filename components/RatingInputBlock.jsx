import { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import Spacer from './Spacer'
import StarRating from './StarRating'
import BasicButton from './BasicButton'

const initialRatings = { food: 0, host: 0, general: 0 }

const RatingInputBlock = ({
  eventId, user, createRating, ratingFields, styles, onCancel, fetchRatings
}) => {
  const [ratingsInput, setRatingsInput] = useState(initialRatings)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRatingChange = (key, val) =>
    setRatingsInput(r => ({ ...r, [key]: val }))

  async function handleSave() {
    if (!user || loading) return
    setLoading(true)
    try {
        await createRating({
        eventId,
        userId: user.$id,
        userName: user.name,
        foodRating: ratingsInput.food,
        hostRating: ratingsInput.host,
        generalRating: ratingsInput.general,
        comment,
        createdAt: new Date().toISOString()
        })
        setRatingsInput(initialRatings)
        setComment('')
        await fetchRatings(eventId)
        // onCancel() NICHT aufrufen!
    } catch {
        alert('Fehler beim Speichern der Bewertung')
    }
    setLoading(false)
    }

  return (
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
            setRatingsInput(initialRatings)
            setComment('')
            onCancel()
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
  )
}

export default RatingInputBlock