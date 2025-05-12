import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../hooks/useUser';
import { Colors } from '../constants/Colors';

const HostIconCircle = () => {
  const { user } = useUser();
  const userInitial = user?.name?.charAt(0).toUpperCase() || '?';

// TODO: Initial von Host aus dem Event muss übernommen werden, nicht der des eingeloggten Users

  return (
    <View style={styles.circle}>
      <Text style={styles.initial}>{userInitial}</Text>
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