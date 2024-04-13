import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Button, Linking } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { Ionicons } from '@expo/vector-icons';


export default function EventScreen({ navigation, email }) {
    const [joinedEvents, setJoinedEvents] = useState([
        { id: 1, title: 'Community 5K Run', date: 'April 25, 2024', location: 'City Stadium', address: 'Fayetteville, AR 72701', description: 'A community run for charity.' },
        { id: 2, title: 'Annual Neighborhood Soccer Game', date: 'April 30, 2024', location: 'Library Hall', address:'201 Spring Street Springdale, AR 72764', description: 'Bring yoiur family and friends to this inclusive soccer experience' },
        { id: 3, title: 'Local Flag Football', date: 'May 1, 2024', location: 'Downtown Market',address: 'Fayetteville, AR 72701', description: 'Ages 10-13 only' }
    ]);
    const [upcomingEvents, setUpcomingEvents] = useState([
        { id: 1, title: 'Neighborhood Wiffleball Game', date: 'May 5, 2024', location: 'Riverbank Plaza',address: 'New York City, New York', description: 'All ages welcome, teams of 9' },
        { id: 2, title: 'Charity Basketball Game', date: 'May 10, 2024', location: 'Downtown Arena',address: 'Fayetteville, AR 72701', description: 'Watch or join the local charity basketball game. Max 7 people per team' },
        { id: 3, title: 'Frisbee Golf Meetup', date: 'May 15, 2024', location: 'Innovation Hub',address: 'Fayetteville, AR 72701', description: 'Network with local frisbee golf enthusiasts and professionals.' },
        { id: 4, title: 'Outdoor Yoga', date: 'May 20, 2024', location: 'City Park Amphitheater',address: 'Fayetteville, AR 72701', description: 'Enjoy an evening of tranquility and relaxation under the stars.' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [eventDetailsModalVisible, setEventDetailsModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [address, setAddress] = useState('');

    const handleOpenInMaps = () => {
        console.log(selectedEvent.address);
        const mapsUrl = `http://maps.apple.com/?daddr=${encodeURIComponent(selectedEvent.address)}`;
        console.log(mapsUrl);
        Linking.openURL(mapsUrl);
    };

    
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        location: '',
        address: '',
        description: '',
        
    });
    const [addEventModalVisible, setAddEventModalVisible] = useState(false);

    const openEventDetails = (event, from) => {
        setSelectedEvent({ ...event, from });
        setEventDetailsModalVisible(true);
    };

    const joinEvent = () => {
        if (selectedEvent.from === 'upcoming') {
            setUpcomingEvents(upcomingEvents.filter(event => event.id !== selectedEvent.id));
            setJoinedEvents([...joinedEvents, selectedEvent]);
        }
        setEventDetailsModalVisible(false);
    };

    const leaveEvent = () => {
        if (selectedEvent.from === 'joined') {
            setJoinedEvents(prevEvents =>
                prevEvents.filter(event => event.id !== selectedEvent.id)
            );
            setUpcomingEvents(prevEvents => [
                ...prevEvents,
                { ...selectedEvent, from: undefined }
            ]);
        }
        setEventDetailsModalVisible(false);
    };

    const handleAddEvent = () => {
        setUpcomingEvents([...upcomingEvents, newEvent]);
        setAddEventModalVisible(false);
        setNewEvent({
            title: '',
            date: '',
            location: '',
            address: '',
            description: '',
        });
    };

    // Filter joined events based on search query
    const filteredJoinedEvents = joinedEvents.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter upcoming events based on search query
    const filteredUpcomingEvents = upcomingEvents.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for Events"
                    placeholderTextColor="#666"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <TouchableOpacity style={styles.circleContainer} onPress={() => setAddEventModalVisible(true)}>
                    <Ionicons name="add-circle-outline" size={40} color="#F8FAE5" />
                </TouchableOpacity>
            </View>

            <ViewPager style={styles.viewPager} initialPage={0}>
                <View key="1">
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionHeader}>Joined Events</Text>
                        {filteredJoinedEvents.map((event) => (
                            <TouchableOpacity key={event.id} onPress={() => openEventDetails(event, 'joined')}>
                            <TouchableOpacity style={styles.mapIcon} key={event.id} onPress={() => handleOpenInMaps()}>
                                    <Ionicons name="pin" size={40} color="#ce5e31" />
                                </TouchableOpacity>
                                <View style={styles.eventBox}>
                               
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                    <Text style={styles.eventInfo}>{event.date} - {event.location}</Text>
                                    <Text style={styles.eventInfo}>{event.address}</Text>
                                    <Text style={styles.eventDescription}>{event.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View key="2">
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionHeader}>Upcoming Events</Text>
                        {filteredUpcomingEvents.map((event) => (
                            <TouchableOpacity key={event.id} onPress={() => openEventDetails(event, 'upcoming')}>
                                 <TouchableOpacity style={styles.mapIcon} key={event.id} onPress={() => handleOpenInMaps()}>
                                    <Ionicons name="pin" size={40} color="#ce5e31" />
                                </TouchableOpacity>
                                <View style={styles.eventBox}>
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                    <Text style={styles.eventInfo}>{event.date} - {event.location}</Text>
                                    <Text style={styles.eventDescription}>{event.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </ViewPager>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={eventDetailsModalVisible}
                onRequestClose={() => setEventDetailsModalVisible(false)}
            >
                <View style={styles.centeredOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{selectedEvent ? selectedEvent.title : ''}</Text>
                        <Text>Date: {selectedEvent ? selectedEvent.date : ''}</Text>
                        <Text>Location: {selectedEvent ? selectedEvent.location : ''}</Text>
                        <TouchableOpacity onPress={handleOpenInMaps}>
                        <Text>Address: {selectedEvent ? selectedEvent.address : ''}</Text>
                        </TouchableOpacity>
                        <Text>Description: {selectedEvent ? selectedEvent.description : ''}</Text>
                        {selectedEvent?.from === 'upcoming' ? (
                            <Button title="Join Event" onPress={joinEvent} />
                        ) : (
                            <Button title="Leave Event" onPress={leaveEvent} />
                        )}
                        <Button title="Close" onPress={() => setEventDetailsModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={addEventModalVisible}
                onRequestClose={() => setAddEventModalVisible(false)}
            >
                <View style={styles.centeredOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add New Event</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            placeholderTextColor={'#ccc'}
                            onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                            value={newEvent.title}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Date"
                            placeholderTextColor={'#ccc'}
                            onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
                            value={newEvent.date}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            placeholderTextColor={'#ccc'}
                            onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                            value={newEvent.location}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            placeholderTextColor={'#ccc'}
                            onChangeText={(text) => setNewEvent({ ...newEvent, address: text })}
                            value={newEvent.address}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            placeholderTextColor={'#ccc'}
                            onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                            value={newEvent.description}
                        />
                        <Button title="Add Event" onPress={handleAddEvent} />
                        <Button title="Cancel" onPress={() => setAddEventModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25294a',
    },
    scrollView: {
        marginHorizontal: 10,
        
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#F8FAE5',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    eventBox: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#F8FAE5',
        marginBottom: 10,
        marginRight: 10, // ensure spacing for scrolling if necessary
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        marginTop: 15,
        height: 50,
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#F8FAE5',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    circleContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewPager: {
        flex: 1,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '80%',
        maxHeight: '80%',
    },
    centeredOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    mapIcon: {
        position: 'absolute',
        right: 15,
        top: 10,
        zIndex: 1,
        color: '#ce5e31',
    },

});
