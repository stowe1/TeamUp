import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Button, Platform } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CommunityScreen({ navigation, email }) {
    // Dummy data for the example
    const [joinedCommunities, setJoinedCommunities] = useState([
        { id: 1, title: 'Pickleball Pirates', date: 'April 20, 2024', location: 'Central Park', description: 'We welcome all pickleball enthusiasts of any level' },
        { id: 2, title: 'Run4Fayetteville', date: 'April 25, 2024', location: 'City Stadium', description: 'A community run for charity.' },
        { id: 3, title: 'Frisbee Golf For All', date: 'April 30, 2024', location: 'Library Hall', description: 'Bring your family and friends to this inclusive soccer experience' },
        { id: 4, title: 'Neighborhood Soccer', date: 'May 1, 2024', location: 'Downtown Market', description: 'Ages 10-13 only' }
    ]);
    const [upcomingCommunities, setUpcomingCommunities] = useState([
        { id: 5, title: 'Neighborhood Wiffleball Game', date: 'May 5, 2024', location: 'Riverbank Plaza', description: 'All ages welcome, teams of 9' },
        { id: 6, title: 'Charity Basketball Game', date: 'May 10, 2024', location: 'Downtown Arena', description: 'Watch or join the local charity basketball game. Max 7 people per team' },
        { id: 7, title: 'Frisbee Golf Meetup', date: 'May 15, 2024', location: 'Innovation Hub', description: 'Network with local frisbee golf enthusiasts and professionals.' },
        { id: 8, title: 'Outdoor Yoga', date: 'May 20, 2024', location: 'City Park Amphitheater', description: 'Enjoy an evening of tranquility and relaxation under the stars.' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [communityDetailsModalVisible, setCommunityDetailsModalVisible] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [isCommunityFromJoined, setIsCommunityFromJoined] = useState(false);

    

    const handleCommunityClick = (community, fromJoined) => {
        setSelectedCommunity(community);
        setIsCommunityFromJoined(fromJoined);
        setCommunityDetailsModalVisible(true);
    };

    const handleJoinOrLeave = () => {
        if (isCommunityFromJoined) {
            setJoinedCommunities(joinedCommunities.filter(community => community.id !== selectedCommunity.id));
            setUpcomingCommunities([...upcomingCommunities, selectedCommunity]);
        } else {
            setUpcomingCommunities(upcomingCommunities.filter(community => community.id !== selectedCommunity.id));
            setJoinedCommunities([...joinedCommunities, selectedCommunity]);
        }
        setCommunityDetailsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for Communities"
                    placeholderTextColor="#666"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <TouchableOpacity style={styles.circleContainer} onPress={() => setCommunityDetailsModalVisible(true)}>
                    <Ionicons name="add-circle-outline" size={40} color="#F8FAE5" />
                </TouchableOpacity>
            </View>

            <ViewPager style={styles.viewPager} initialPage={0}>
                <View key="1" style={{flex: 1}}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionHeader}>Joined Communities</Text>
                        {joinedCommunities.map((community) => (
                            <TouchableOpacity key={community.id} onPress={() => handleCommunityClick(community, true)}>
                                <View style={styles.eventBox}>
                                    <Text style={styles.eventTitle}>{community.title}</Text>
                                    <Text style={styles.eventInfo}>{community.date} - {community.location}</Text>
                                    <Text style={styles.eventDescription}>{community.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View key="2" style={{flex: 1}}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionHeader}>Upcoming Communities</Text>
                        {upcomingCommunities.map((community) => (
                            <TouchableOpacity key={community.id} onPress={() => handleCommunityClick(community, false)}>
                                <View style={styles.eventBox}>
                                    <Text style={styles.eventTitle}>{community.title}</Text>
                                    <Text style={styles.eventInfo}>{community.date} - {community.location}</Text>
                                    <Text style={styles.eventDescription}>{community.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </ViewPager>

            <Modal
                animationType="slide"
                transparent={true}
                visible={communityDetailsModalVisible}
                onRequestClose={() => setCommunityDetailsModalVisible(false)}
            >
                <View style={styles.centeredOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{selectedCommunity ? selectedCommunity.title : ''}</Text>
                        <Text>Date: {selectedCommunity ? selectedCommunity.date : ''}</Text>
                        <Text>Location: {selectedCommunity ? selectedCommunity.location : ''}</Text>
                        <Text>Description: {selectedCommunity ? selectedCommunity.description : ''}</Text>
                        <Button title={isCommunityFromJoined ? "Leave Community" : "Join Community"} onPress={handleJoinOrLeave} />
                        <Button title="Close" onPress={() => setCommunityDetailsModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
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
    },
    eventBox: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#F8FAE5',
        marginBottom: 10,
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
    centeredOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    datePickerText: {
        padding: 10,
        color: '#000',
        fontSize: 18,
    },
    viewPager: {
        flex: 1,
    },
});
