import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

// Screens
import CommunityScreen from '../screens/CommunityScreen';
import EventScreen from '../screens/EventScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

// Screen names
const Login = 'Login';
const signUp = 'Sign Up';
const Profile = 'Profile';
const Community = 'Community';
const Map = 'Map';
const Event = 'Event';
const Tab = createBottomTabNavigator();

export default function MainContainer() {
    const [loggedIn, setLoggedIn] = useState(false); // Assuming initially not logged in
    const [signUp, setSignUp] = useState(false); // Assuming initially not signed up

    // Function to toggle login status
    const handleLogin = () => {
        setLoggedIn(true); // Set to true when user logs in successfully
    };
    const handleSignUp = () => {
        setSignUp(true); // Set to true when user signs up successfully
    };

    return (
        <NavigationContainer>
            {loggedIn ? (
                <Tab.Navigator
                    initialRouteName={Login}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === Profile) {
                                iconName = focused ? 'person' : 'person-circle';
                            } else if (route.name === Community) {
                                iconName = focused ? 'people' : 'people-circle';
                            } else if (route.name === Map) {
                                iconName = focused ? 'map' : 'map-circle';
                            } else if (route.name === Event) {
                                iconName = focused ? 'calendar' : 'calendar-circle';
                            }
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'blue',
                        inactiveTintColor: 'gray',
                    }}
                >   
                    <Tab.Screen name={Profile} component={ProfileScreen} />
                    <Tab.Screen name={Community} component={CommunityScreen} />
                    <Tab.Screen name={Map} component={MapScreen} />
                    <Tab.Screen name={Event} component={EventScreen} />
                </Tab.Navigator>
            ) : signUp ? (
                // Render SignUpScreen if signed up but not logged in
                <SignUpScreen onSignUp={handleSignUp} />
            ) : (
                // Render login screen if not logged in
                <LoginScreen onLogin={handleLogin} signUp={handleSignUp} />
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
