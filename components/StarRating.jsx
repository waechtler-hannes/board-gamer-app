import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

//Konstanten
import { Colors } from '../constants/Colors'

const StarRating = ({ rating, onChange, size = 20, readonly = false, starColor, emptyStarColor }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Ionicons
        key={star}
        name={star <= rating ? 'star' : 'star-outline'}
        size={size}
        color={star <= rating ? (starColor || Colors.primary) : (emptyStarColor || Colors.primary)}
        style={{ marginHorizontal: 1 }}
        {...(!readonly && { onPress: () => onChange(star) })}
      />
    ))}
  </View>
);

export default StarRating;