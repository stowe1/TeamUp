import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Button, Platform  } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


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
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);  // State to control visibility of DateTimePicker
    const [mode, setMode] = useState('date');
    const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', description: '', section: 'joined' });
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        setModalVisible(true);
        showMode('date');
    };
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
            <View style={styles.search}>
 
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for Events"
                    placeholderTextColor="#666"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <TouchableOpacity style={styles.circleContainer} onPress={showDatepicker}>
                <View style={styles.circle}>
                    <Ionicons name="add-circle-outline" size={40} color="#F8FAE5" />
                </View>
            </TouchableOpacity>
            </View>
            
            <ViewPager style={styles.viewPager} initialPage={0}>
                <View key="1">
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionHeader}>Joined Events</Text>
                        {filterEvents(joinedEvents).map((event) => (
                            <View key={event.id} style={styles.eventBox}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <Text style={styles.eventInfo}>{event.date} - {event.location}</Text>
                                <Text style={styles.eventDescription}>{event.description}</Text>
                                <Button title="Delete" onPress={() => handleDeleteEvent(event.id, 'joined')} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View key="2">
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionHeader}>Upcoming Events</Text>
                        {filterEvents(upcomingEvents).map((event) => (
                            <View key={event.id} style={styles.eventBox}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <Text style={styles.eventInfo}>{event.date} - {event.location}</Text>
                                <Text style={styles.eventDescription}>{event.description}</Text>
                                <Button title="Delete" onPress={() => handleDeleteEvent(event.id, 'upcoming')} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ViewPager>
            
            <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(!modalVisible)}
>
  <View style={styles.centeredOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Add Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newEvent.title}
        // onChangeText={setTitle}
      />
      <Text style={styles.modalTitle}>Select Date</Text>
      {show && (
        <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={newEvent.location}
        // onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newEvent.description}
        // onChangeText={setDetails}
        multiline
      />
      <Button title="Save" onPress={handleAddEvent} />
      <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
        backgroundColor: '#25294a',
    },
    scrollView: {
        marginHorizontal: 10,
        
    },
    section: {
        marginVertical: 20,
        justifyContent: 'space-between',
        paddinnghorizontal: 10,
        padding: 100,
        borderRadius: 8,
        backgroundColor: '#25294a',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height: 60,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        borderBottomEndRadius: 100,
        color: '#F8FAE5',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    eventBox: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#F8FAE5',
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
        width: 50,
        height: 50,
        borderColor: '#F8FAE5',
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
        backgroundColor: '#F8FAE5',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 0,
        borderColor: 'transparent',
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
    viewPager: {
        flex: 1,

    },
    modalContainer: {
        backgroundColor: '#F8FAE5', // Setting a neutral background color
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '80%', // Making sure it's not too wide
        maxHeight: '80%', // Prevents the modal from being too tall
        alignItems: 'center', // Centers content horizontally within the modal
    },
    centeredOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)' // Semi-transparent background
    },
    
    
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
    });

