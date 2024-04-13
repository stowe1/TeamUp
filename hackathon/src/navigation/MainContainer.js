import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import CommunityScreen from '../screens/CommunityScreen';
import EventScreen from '../screens/EventScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Screen names
const Profile = 'Profile';
const Community = 'Community';
const Map = 'Map';
const Event = 'Event';
const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={Profile}
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
