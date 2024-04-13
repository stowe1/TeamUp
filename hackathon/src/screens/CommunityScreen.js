import * as React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

export default function CommunityScreen({ navigation }) {
    // Dummy data for the example
    const yourCommunities = [
        { id: 1, title: 'Pickleball Pirates', date: 'April 20, 2024', location: 'Central Park', description: 'We welcome all pickleball enthusiasts of any level' },
        { id: 2, title: 'Run4Fayetteville', date: 'April 25, 2024', location: 'City Stadium', description: 'A community run for charity.' },
        { id: 3, title: 'Frisbee Golf For All', date: 'April 30, 2024', location: 'Library Hall', description: 'Bring your family and friends to this inclusive soccer experience' },
        { id: 4, title: 'Neighborhood Soccer', date: 'May 1, 2024', location: 'Downtown Market', description: 'Ages 10-13 only' }
    ];

    const recommendedCommunities = [
        { id: 1, title: 'Neighborhood Wiffleball Game', date: 'May 5, 2024', location: 'Riverbank Plaza', description: 'All ages welcome, teams of 9' },
        { id: 2, title: 'Charity Basketball Game', date: 'May 10, 2024', location: 'Downtown Arena', description: 'Watch or join the local charity basketball game. Max 7 people per team' },
        { id: 3, title: 'Frisbee Golf Meetup', date: 'May 15, 2024', location: 'Innovation Hub', description: 'Network with local frisbee golf enthusiasts and professionals.' },
        { id: 4, title: 'Outdoor Yoga', date: 'May 20, 2024', location: 'City Park Amphitheater', description: 'Enjoy an evening of tranquility and relaxation under the stars.' }
    ];

    return (
        <View style={styles.outerContainer}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <View style={styles.circleContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.plus}>+</Text>
                    </View>
                </View>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for Communities"
                    placeholderTextColor="#666" />
                <View style={styles.circleContainer}></View>
            </View>

            {/* ViewPager for swiping between sections */}
            <ViewPager style={styles.viewPager} initialPage={0}>
                <View key="1">
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionHeader}>Your Communities</Text>
                        {yourCommunities.map((event) => (
                            <View key={event.id} style={styles.eventBox}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <Text style={styles.eventInfo}>{event.date} - {event.location}</Text>
                                <Text style={styles.eventDescription}>{event.description}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View key="2">
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionHeader}>Recommended Communities</Text>
                        {recommendedCommunities.map((event) => (
                            <View key={event.id} style={styles.eventBox}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <Text style={styles.eventInfo}>{event.date} - {event.location}</Text>
                                <Text style={styles.eventDescription}>{event.description}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ViewPager>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#25294a',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 60,
        backgroundColor: '#25294a',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    circleContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plus: {
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 35,
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#F8FAE5',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginLeft: 10,
        marginRight: -5,
    },
    viewPager: {
        flex: 1,
    },
    scrollView: {
        marginHorizontal: 10,
    },
    sectionHeader: {
        alignContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#F8FAE5',
    },
    eventBox: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#F8FAE5',
        marginBottom: 10,
        marginRight: 10, // for spacing between items in horizontal scroll
        width: 250, // fixed width for horizontal scrolling
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventInfo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    eventDescription: {
        fontSize: 14,
    },
});
