import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Button } from 'react-native';

export default function EventScreen({ navigation }) {
    const [joinedEvents, setJoinedEvents] = useState([
        { id: 1, title: 'Morning Hoop Session', date: 'April 20, 2024', location: 'Central Park', description: 'All levels welcome' },
        { id: 2, title: 'Community 5K Run', date: 'April 25, 2024', location: 'City Stadium', description: 'A community run for charity.' },
        { id: 3, title: 'Annual Neighborhood Soccer Game', date: 'April 30, 2024', location: 'Library Hall', description: 'Bring your family and friends to this inclusive soccer experience' },
        { id: 4, title: 'Local Flag Football', date: 'May 1, 2024', location: 'Downtown Market', description: 'Ages 10-13 only' }
    ]);
    const [upcomingEvents, setUpcomingEvents] = useState([
        { id: 1, title: 'Neighborhood Wiffleball Game', date: 'May 5, 2024', location: 'Riverbank Plaza', description: 'All ages welcome, teams of 9' },
        { id: 2, title: 'Charity Basketball Game', date: 'May 10, 2024', location: 'Downtown Arena', description: 'Watch or join the local charity basketball game. Max 7 people per team' },
        { id: 3, title: 'Frisbee Golf Meetup', date: 'May 15, 2024', location: 'Innovation Hub', description: 'Network with local frisbee golf enthusiasts and professionals.' },
        { id: 4, title: 'Outdoor Yoga', date: 'May 20, 2024', location: 'City Park Amphitheater', description: 'Enjoy an evening of tranquility and relaxation under the stars.' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', description: '', section: 'joined' });

    const handleAddEvent = () => {
        const newEventToAdd = { ...newEvent, id: newEvent.section === 'joined' ? joinedEvents.length + 1 : upcomingEvents.length + 1 };
        if (newEvent.section === 'joined') {
            setJoinedEvents([...joinedEvents, newEventToAdd]);
        } else {
            setUpcomingEvents([...upcomingEvents, newEventToAdd]);
        }
        setNewEvent({ title: '', date: '', location: '', description: '', section: 'joined' });
        setModalVisible(false);
    };

    const handleDeleteEvent = (id, section) => {
        if (section === 'joined') {
            setJoinedEvents(joinedEvents.filter(event => event.id !== id));
        } else {
            setUpcomingEvents(upcomingEvents.filter(event => event.id !== id));
        }
    };

    const filterEvents = (events) => {
        if (!searchQuery.trim()) return events;
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
            {/* Top Bar */}
            <View style={styles.search}>
                <TouchableOpacity style={styles.circleContainer} onPress={() => setModalVisible(true)}>
                    <View style={styles.circle}>
                        <Text style={styles.plus}>+</Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for Events"
                    placeholderTextColor="#666"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <View style={styles.circleContainer}>
                    <View style={styles.circle}>
                        <Image
                            source={require('./assets/default_icon.png')} // Set the image source here
                            style={styles.circleImage}
                        />
                    </View>
                </View>
            </View>

            {/* Middle Section */}
            <ScrollView style={styles.scrollView}>
                {['joined', 'upcoming'].map(section => (
                    <View key={section} style={styles.section}>
                        <Text style={styles.sectionHeader}>{section === 'joined' ? 'Joined Events' : 'Upcoming Events'}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {filterEvents(section === 'joined' ? joinedEvents : upcomingEvents).map((event) => (
                                <View key={event.id} style={styles.eventBox}>
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                    <Text style={styles.eventInfo}>{event.date} - {event.location}</Text>
                                    <Text style={styles.eventDescription}>{event.description}</Text>
                                    <Button title="Delete" onPress={() => handleDeleteEvent(event.id, section)} />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>
            {/* Modal for Adding New Event */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                            value={newEvent.title}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Date"
                            onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
                            value={newEvent.date}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                            value={newEvent.location}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                            value={newEvent.description}
                        />
                        <Button title="Add Event" onPress={handleAddEvent} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    // Add your styles here
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
        marginRight: 10,
        width: 250,
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
        paddingHorizontal: 10,
        borderTopRadius: 8,
        borderBottomRadius: 8,
        backgroundColor: '#f0f0f0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 60,
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
    circleImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    input: {
        width: '80%', // Ensure the input fields do not go off screen
        marginBottom: 15,
        paddingHorizontal: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
});
