import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';

export default function EventScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const joinedEvents = [
        { id: 1, title: 'Morning Hoop Session', date: 'April 20, 2024', location: 'Central Park', description: 'All levels welcome' },
        { id: 2, title: 'Community 5K Run', date: 'April 25, 2024', location: 'City Stadium', description: 'A community run for charity.' },
        { id: 3, title: 'Annual Neighborhood Soccer Game', date: 'April 30, 2024', location: 'Library Hall', description: 'Bring your family and friends to this inclusive soccer experience' },
        { id: 4, title: 'Local Flag Football', date: 'May 1, 2024', location: 'Downtown Market', description: 'Ages 10-13 only' }
    ];

    const upcomingEvents = [
        { id: 1, title: 'Neighborhood Wiffleball Game', date: 'May 5, 2024', location: 'Riverbank Plaza', description: 'All ages welcome, teams of 9' },
        { id: 2, title: 'Charity Basketball Game', date: 'May 10, 2024', location: 'Downtown Arena', description: 'Watch or join the local charity basketball game. Max 7 people per team' },
        { id: 3, title: 'Frisbee Golf Meetup', date: 'May 15, 2024', location: 'Innovation Hub', description: 'Network with local frisbee golf enthusiasts and professionals.' },
        { id: 4, title: 'Outdoor Yoga', date: 'May 20, 2024', location: 'City Park Amphitheater', description: 'Enjoy an evening of tranquility and relaxation under the stars.' }
    ];

    const filterEvents = (events) => {
        if (!searchQuery.trim()) return events; // return all events if search query is empty
        const lowerCaseQuery = searchQuery.toLowerCase();
        return events.filter(event =>
            event.title.toLowerCase().includes(lowerCaseQuery) ||
            event.date.toLowerCase().includes(lowerCaseQuery) ||
            event.location.toLowerCase().includes(lowerCaseQuery) ||
            event.description.toLowerCase().includes(lowerCaseQuery)
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <View style={styles.circleContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.plus}>+</Text>
                    </View>
                </View>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for Events"
                    placeholderTextColor="#666"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <View style={styles.circleContainer}>
                    <View style={styles.circle}></View>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Joined Events</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {filterEvents(joinedEvents).map((event) => (
                            <View key={event.id} style={styles.eventBox}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <Text style={styles.eventInfo}>{event.date} - {event.location}</Text>
                                <Text style={styles.eventDescription}>{event.description}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Upcoming Events</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {filterEvents(upcomingEvents).map((event) => (
                            <View key={event.id} style={styles.eventBox}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <Text style={styles.eventInfo}>{event.date} - {event.location}</Text>
                                <Text style={styles.eventDescription}>{event.description}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
    },
    scrollView: {
        marginHorizontal: 10,
    },
    section: {
        marginVertical: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#add8e6',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    eventBox: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff',
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
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        height: 50,
    },
    circleContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plus: {
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 25,
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginLeft: 10,
        marginRight: 10,
        borderwidth: 1,
        bordercolor: 'gray',
    },
});
