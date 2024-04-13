import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function EventScreen({ navigation }) {
    // Dummy data for the example
    const joinedEvents = [
        { id: 1, title: 'Morning Hoop Session' },
        { id: 2, title: 'Community 5K Run' }
    ];

    const upcomingEvents = [
        { id: 1, title: 'Neighborhood Cleanup' },
        { id: 2, title: 'Charity Basketball Game' }
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Joined Events</Text>
                    {joinedEvents.map((event) => (
                        <Text key={event.id} style={styles.eventItem}>{event.title}</Text>
                    ))}
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Events</Text>
                    {upcomingEvents.map((event) => (
                        <Text key={event.id} style={styles.eventItem}>{event.title}</Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        margin: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    eventItem: {
        fontSize: 16,
        marginBottom: 5,
    },
});
