// App.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importiere die Icons
import "bootstrap/dist/css/bootstrap.min.css"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const BewertungenScreen = () => (
  <View style={styles.screen}>
    <Text>Hier kannst du deine Bewertungen von vergangenen Veranstaltungen tätigen.</Text>
  </View>
);

const ChatScreen = () => (
  <View style={styles.screen}>
    <Text>Willkommen im Chat!</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Das ist dein Profil.</Text>
  </View>
);

const EventsScreen = () => (
  <View style={styles.screen}>
    <Text>Hier können neue Events hinzugefügt werden.</Text>
  </View>
);

// Custom Header Component
// TODO: Leiten auf die Home/Events/Startseite funktioniert hier noch nicht
const CustomHeader = ({ navigation, route, options }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('Events')}>
          <Icon name="arrow-left" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{options.title}</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Icon name="comments" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Tabs with Bewertungen and Events
const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#69394A',
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveBackgroundColor: '#A63E62',
      /* tabBarLabelStyle: {
        borderTopColor: 'blue',
        borderTopWidth: 5,
        flex: 1,
        marginTop: 0,
      } */ 
    }}
    >
      <Tab.Screen 
          name="Bewertungen" 
          component={BewertungenScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="star" color={color} size={size} /> // Stern-Icon für Bewertungen
            ),
          }} 
        />
        <Tab.Screen 
          name="Events" 
          component={EventsScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" color={color} size={size} /> // Kalender-Icon für Events
            ),
          }}
        />
    </Tab.Navigator>
  );
};

  // Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,
          headerStyle: { backgroundColor: '#A63E62' },
        }}
      >
        <Stack.Screen name="Home" component={TabNavigator} options={{ title: 'TEAMPLAY' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    height: 60,
    backgroundColor: '#A63E62',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 35, // optischer Ausgleich, da links nur ein Icon ist
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'right',
    marginRight: 10,

  },
  leftIcons:{
    flexDirection: 'row',

  },
  icon: {
    marginLeft: 15,
  },

  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});