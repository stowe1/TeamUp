import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import CommunityScreen from '../screens/CommunityScreen';
import EventScreen from '../screens/EventScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Profile = 'Profile';
const Community = 'Community';
const Map = 'Map';
const Event = 'Event';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class MainContainer extends Component {
  state = {
    loggedIn: false,
    signedUp: false,
    signUpToTab: false,
    emailState: ''
  };

  handleLogin = ({ email }) => {
    this.setState({ emailState: email, loggedIn: true });
  };

  handleSignUp = (email) => {
    this.setState({ emailState: email, signedUp: true });
  };

  goBackToLogin = () => {
    this.setState({ signedUp: false });
  };

  signUpToTabNav = () => {
    this.setState({ signUpToTab: true });
  };

  render() {
    const { loggedIn, signUpToTab, signedUp, emailState } = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#25294a' },
          headerShown: false,
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}>
          {loggedIn || signUpToTab ? (
            <Stack.Screen name="Tab" children={() => <TabNavigator email={emailState} />} options={{ title: 'Tab', headerShown: false }} />
          ) : signedUp ? (
            <Stack.Screen name="SignUp" children={() => <SignUpScreen onSignUp={this.signUpToTabNav} goBack={this.goBackToLogin} />} options={{ title: 'Sign Up' }} />
          ) : (
            <Stack.Screen name="Login" children={() => <LoginScreen onLogin={this.handleLogin} signUp={this.handleSignUp} />} options={{ title: 'Login' }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const TabNavigator = ({ email }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBarStyle,
        headerTitle: 'TeamUP',
        headerShown: route.name !== Map,
        headerShown: route.name !== Profile,
        headerStyle: { backgroundColor: '#25294a', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0 },
        headerTitleStyle: { fontWeight: 'bold', fontSize: 30, fontStyle: 'bold', color: '#EEE4B1' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === Profile) iconName = focused ? 'person' : 'person-circle';
          else if (route.name === Community) iconName = focused ? 'people' : 'people-circle';
          else if (route.name === Map) iconName = focused ? 'map' : 'map';
          else if (route.name === Event) iconName = focused ? 'calendar' : 'calendar';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        style: { backgroundColor: '#25294a', borderTopColor: 'blue' },
      }}
    >
      <Tab.Screen name="Profile" children={() => <ProfileScreen email={email} />} />
      <Tab.Screen name="Community" children={() => <CommunityScreen email={email} />} />
      <Tab.Screen name="Map" children={() => <MapScreen email={email} />} />
      <Tab.Screen name="Event" children={() => <EventScreen email={email} />} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#25294a',
    borderTopWidth: 0.5
  }
});
