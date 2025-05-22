import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import Animated, { Extrapolation, interpolate, measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';
import VoteSection from './VoteSection';
import AddVoteable from './AddVoteable';

//Eigene Komponenten
import HostIconCircle from '../components/HostIconCircle'


const EventView = ({value}) => {
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

  useEffect(() => {
    if (open.value) {
      runOnUI(() => {
        "worklet";
        heightValue.value = measure(listRef).height;
      })();
    }
  }, [value.games?.length, value.foods?.length]);

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
          <Text>
            <Text style={styles.headDate}>
              {new Date(value.datetime).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
            </Text>
            {(() => {
              const eventDate = new Date(value.datetime);
              const now = new Date();
              const diffMs = eventDate - now;
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
              if (diffDays >= 1) {
                return ` (in ${diffDays} Tag${diffDays === 1 ? '' : 'en'})`;
              } else if (diffHours >= 1) {
                return ` (in ${diffHours} Stunde${diffHours === 1 ? '' : 'n'})`;
              } else {
                return ' (weniger als 1 Stunde)';
              }
            })()}
          </Text>
          <Text>{value.host.name}</Text>
        </View>
        <Ionicons
          size={24}
          name="create"
          style={styles.icon}
          onPress={() => router.navigate('/edit')}
        />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.contentContainer}>
          <View style={styles.mainContent}>
            <View style={styles.block}>
              <Text style={styles.blockHeading}>Uhrzeit</Text>
              <Text>{new Date(value.datetime).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}{' Uhr'}</Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.blockHeading}>Beschreibung</Text>
              <Text>{value.description}</Text>
            </View>
            <View style={styles.block}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.blockHeading}>Ort</Text>
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
            <View style={styles.block}>
              <Text style={styles.blockHeading}>Spiel</Text>
              <VoteSection value={value.games} eventId={value.$id} type="games" />
              <AddVoteable eventId={value.$id} type="games" currentItems={value.games} />
            </View>
            <View style={styles.block}>
              <Text style={styles.blockHeading}>Essen</Text>
              <VoteSection value={value.foods} eventId={value.$id} type="foods" />
              <AddVoteable eventId={value.$id} type="foods" currentItems={value.foods} />
            </View>
            <View style={styles.block}>
              <Text style={styles.voteEnd}>
                Ende der Abstimmung: {
                  (() => {
                    const endDate = new Date(value.datetime);
                    endDate.setDate(endDate.getDate() - 2);
                    const now = new Date();
                    const diffMs = endDate - now;
                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                    let verbleibend = '';
                    if (diffDays >= 1) {
                      verbleibend = `(in ${diffDays} Tag${diffDays === 1 ? '' : 'en'})`;
                    } else if (diffHours >= 1) {
                      verbleibend = `(in ${diffHours} Stunde${diffHours === 1 ? '' : 'n'})`;
                    } else {
                      verbleibend = '(weniger als 1 Stunde)';
                    }
                    return (
                      endDate.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }) +
                      ' ' +
                      endDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) +
                      ` ${verbleibend}`
                    );
                  })()
                }
              </Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default EventView

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderColor: Colors.outline,
    overflow: "hidden",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10
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
    marginTop: 1
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
  }
})