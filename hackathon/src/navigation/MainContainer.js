import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import CommunityScreen from '../screens/CommunityScreen';
import EventScreen from '../screens/EventScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

// Screen names
const Profile = 'Profile';
const Community = 'Community';
const Map = 'Map';
const Event = 'Event';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainContainer() {
    const [loggedIn, setLoggedIn] = useState(false); // Initially not logged in
    const [signedUp, setSignedUp] = useState(false); // Initially not signed up
    const [signUpToTab, setSignUpToTab] = useState(false); // Initially not going from sign up to tab navigator

    // Function to handle login
    const handleLogin = () => {
        setLoggedIn(true); // Set to true when user logs in successfully
    };

    // Function to handle sign up
    const handleSignUp = () => {
        setSignedUp(true); // Set to true when user signs up successfully
    };

    // Function to handle going back to login from sign up
    const goBackToLogin = () => {
        setSignedUp(false);
    };

    // Function to navigate to tab navigator after signing up
    const signUpToTabNav = () => {
        setSignUpToTab(true);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#25294a', // Change the color of the header
                    },
                    headerShown: false, // Show header for all screens
                    headerTintColor: 'white', // Change the color of the text in the header
                    headerTitleStyle: {
                        fontWeight: 'bold', // Change the font weight of the header title
                    },
                }}
            >
                {loggedIn || signUpToTab ? (
                    <Stack.Screen name="Tab" component={TabNavigator} options={{ title: 'Tab', headerShown: false }} />
                ) : signedUp ? (
                    <Stack.Screen name="SignUp" component={() => <SignUpScreen onSignUp={signUpToTabNav} goBack={goBackToLogin} />} options={{ title: 'Sign Up' }} />
                ) : (
                    <Stack.Screen name="Login" component={() => <LoginScreen onLogin={handleLogin} signUp={handleSignUp} />} options={{ title: 'Login' }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: styles.tabBarStyle,
                headerTitle: 'TeamUP',
                

                headerShown: route.name !== Map, // Hide header for Map route
                headerStyle: {
                    backgroundColor: '#25294a', // Change the color of the header
                    borderBottomWidth: 0, // Remove the border at the bottom of the header
                    shadowOpacity: 0, // Remove any shadows
                    elevation: 0, // Remove any shadows (for Android)
                    
                },
                headerTitleStyle: { // Adjust the style of the header title
                    fontWeight: 'bold', // Change the font weight of the header title
                    fontSize: 30, // Change the font size of the header title
                    fontStyle: 'bold', // Change the font style of the header title
                    color: '#EEE4B1',
    
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === Profile) {
                        iconName = focused ? 'person' : 'person-circle';
                    } else if (route.name === Community) {
                        iconName = focused ? 'people' : 'people-circle';
                    } else if (route.name === Map) {
                        iconName = focused ? 'map' : 'map';
                    } else if (route.name === Event) {
                        iconName = focused ? 'calendar' : 'calendar';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: 'gray',
                style: {
                    backgroundColor: '#25294a', // Change the color of the bottom tab bar
                    borderTopColor: 'blue',
                },
            
            }}
            
            
        >   
            <Tab.Screen name={Profile} component={ProfileScreen} />
            <Tab.Screen name={Community} component={CommunityScreen} />
            <Tab.Screen name={Map} component={MapScreen} />
            <Tab.Screen name={Event} component={EventScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#25294a', // Change the color of the bottom tab bar
        borderTopWidth: 0.5,        
        
    },
});
