import { View, Text, StyleSheet } from 'react-native';

//Konstanten
import { Colors } from '../constants/Colors';

const HostIconCircle = ({ hostName, style }) => {
  const hostInitial = hostName?.charAt(0).toUpperCase() || '?';

  return (
    <View style={style ? [styles.circle, style] : styles.circle}>
      <Text style={styles.initial}>{hostInitial}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: Colors.primaryContainer,

    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  initial: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'light',
  },
});

export default HostIconCircle;