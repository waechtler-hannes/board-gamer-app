import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../hooks/useUser';
import { Colors } from '../constants/Colors';

const UserInitialCircle = () => {
  const { user } = useUser();
  const userInitial = user?.name?.charAt(0).toUpperCase() || '?';

  return (
    <View style={styles.circle}>
      <Text style={styles.initial}>{userInitial}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryContainer,

    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  initial: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'light',
  },
});

export default UserInitialCircle;