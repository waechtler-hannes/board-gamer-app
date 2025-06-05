import { View, Text } from 'react-native'
import Spacer from './Spacer'
import StarRating from './StarRating'

const RatingSummaryBlock = ({ eventRatings, ratingFields, styles }) => {
  if (!eventRatings.length)
    return <Text style={styles.noRatings}>Keine Bewertungen vorhanden.</Text>

  const average = ratingFields.reduce((acc, { key }) => ({
    ...acc,
    [key]: (
      eventRatings.reduce((sum, r) => sum + (r[`${key}Rating`] || 0), 0) /
      eventRatings.length
    ).toFixed(1)
  }), {})

  const comments = eventRatings.filter(r => r.comment?.trim())

  return (
    <View style={[styles.block, styles.summaryBlock]}>
      <Spacer height={15} />
      <Text style={styles.summaryTitle}>Zusammenfassung des Abends:</Text>
      {ratingFields.map(({ key, label }) => (
        <View key={key} style={styles.ratingRow}>
          <Text style={styles.ratingLabel}>{label}</Text>
          <StarRating rating={Number(average[key])} size={22} readonly starColor={styles.ratingValue.color} emptyStarColor={styles.ratingValue.color} />
          <Text style={styles.ratingValue}>({average[key]})</Text>
        </View>
      ))}
      <Text style={styles.ratingCount}>({eventRatings.length} Bewertungen)</Text>
      <Text style={styles.commentsTitle}>Kommentare</Text>
      {comments.length === 0 ? (
        <Text style={styles.noComments}>Keine Kommentare vorhanden.</Text>
      ) : (
        comments.map((r, idx) => (
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
  )
}

export default RatingSummaryBlock