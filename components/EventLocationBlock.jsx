import { Text, View, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const EventLocationBlock = ({ value, styles }) => (
  <View style={styles.block}>
    <View style={styles.row}>
      <View>
        <Text style={styles.boldText}>Ort</Text>
        <Text>
          {value.host.street} {value.host.housenumber}, {value.host.postalcode} {value.host.city}
        </Text>
      </View>
      <Ionicons
        onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${value.host.street}+${value.host.housenumber}+${value.host.postalcode}+${value.host.city}`)}
        name="map"
        size={24}
        style={styles.icon}
      />
    </View>
  </View>
)

export default EventLocationBlock