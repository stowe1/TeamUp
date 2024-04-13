import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { supabase } from '../components/supabase';
import { Ionicons } from '@expo/vector-icons';


export default function ProfileScreen({ navigation, email }) {
    const [inputName, setInputName] = useState('');
    const [displayedName, setDisplayedName] = useState('');
    const [displayedBio, setDisplayedBio] = useState('');
    const [displayedCity, setDisplayedCity] = useState('');
    const [displayedState, setDisplayedState] = useState('');
    const [displayedInterest1, setDisplayedInterest1] = useState('');
    const [displayedInterest2, setDisplayedInterest2] = useState('');
    const [displayedInterest3, setDisplayedInterest3] = useState('');
    const [interestModalVisible, setInterestModalVisible] = useState(false);
    const [newInterest, setNewInterest] = useState('');
   


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const randomColor = getRandomColor();
    useEffect(() => {
        if (email) { // Only run getProfile if email is available
            getProfile();
        }
    }, []); // Removed email from dependency array, it will only run on component mount

    const getProfile = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('first_name, last_name, Bio, City, State, interest1, interest2, interest3')
            .eq('email', email);
        if (error) {
            console.error('Error fetching profile:', error.message);
            return;
        }
        if (data && data.length > 0) {
            console.log('Profile data:', data);
            setDisplayedName(`${data[0].first_name} ${data[0].last_name}`);
            setDisplayedBio(data[0].Bio || '');
            setDisplayedCity(data[0].City || '');
            setDisplayedState(data[0].State || '');
            setDisplayedInterest1(data[0].interest1 || '');
            setDisplayedInterest2(data[0].interest2 || '');
            setDisplayedInterest3(data[0].interest3 || '');
        
        } else {
            console.log('No data found');
        }
    };

    const handleChangeBio = (text) => {
        setDisplayedBio(text);
    };

    const handleSubmitBio = () => {
        console.log('Submitted bio:', displayedBio);
        // Update the user's bio in the database
        supabase
            .from('users')
            .update({ Bio: displayedBio })
            .eq('email', email)
            .then(({ data, error }) => {
                if (error) {
                    console.error('Error updating bio:', error.message);
                    return;
                }
                console.log('Bio updated successfully:', data);
            });
    };

    const handleAddInterest = () => {
        
        setInterestModalVisible(true);

    };

    const handleSaveInterest = () => {
        console.log('Saving interest:', displayedInterest1, displayedInterest2, displayedInterest3)
        // Save the new interest
        supabase
            .from('users')
            .update({ interest1: displayedInterest1, interest2: displayedInterest2, interest3: displayedInterest3 })
            .eq('email', email)
            .then(({ data, error }) => {
                if (error) {
                    console.error('Error updating interest:', error.message);
                    return;
                }
                console.log('Interest updated successfully:', data);
            });

        // Close the modal
        setInterestModalVisible(false);
    };

    const handleCancelInterest = () => {
        // Close the modal
        setInterestModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.gray} />
            <View style={styles.rectangle}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddInterest}>
                    <Text style={styles.buttonText}>Add Interest</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Text style={styles.displayName}>Hey, {displayedName}!</Text>
                <Image
                    source={images.background1}
                    resizeMode='cover'
                    style={styles.backgroundImage}
                />
            </View>

            <View style={styles.profileContainer}>
                <Image
                    source={images.profile}
                    resizeMode='contain'
                    style={styles.profileImage}
                />
                <Text style={styles.displayCity}>{displayedCity}, {displayedState}</Text>

            </View>
            {displayedInterest1 && <Text style={styles.interestText}>{displayedInterest1}</Text>}
            {displayedInterest2 && <Text style={styles.interestText}>{displayedInterest2}</Text>}
            {displayedInterest3 && <Text style={styles.interestText}>{displayedInterest3}</Text>}
            <TextInput
                    style={styles.input}
                    placeholder="About you..."
                    placeholderTextColor={'#F8FAE5'}
                    onChangeText={handleChangeBio}
                    value={displayedBio}
                    onSubmitEditing={handleSubmitBio}
                />
            {/* Modal for adding interest */}
            <Modal
    animationType="slide"
    transparent={true}
    visible={interestModalVisible}
    onRequestClose={() => {
        setInterestModalVisible(false);
    }}
>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <TextInput
                style={styles.modalInput}
                placeholder="Enter interest 1"
                placeholderTextColor={'#F8FAE5'}
                onChangeText={(text) => setDisplayedInterest1(text)}
            />
            <TextInput
                style={styles.modalInput}
                placeholder="Enter interest 2"
                placeholderTextColor={'#F8FAE5'}
                onChangeText={(text) => setDisplayedInterest2(text)}
            />
            <TextInput
                style={styles.modalInput}
                placeholder="Enter interest 3"
                placeholderTextColor={'#F8FAE5'}
                onChangeText={(text) => setDisplayedInterest3(text)}
            />
            <View style={styles.modalButtonContainer}>
                <Button title="Save" onPress={handleSaveInterest} />
                <Button title="Cancel" onPress={handleCancelInterest} />
            </View>
        </View>
    </View>
</Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25294a',
    },
    imageContainer: {
        width: "100%",
    },
    backgroundImage: {
        height: 228,
        width: "100%",
    },
    profileContainer: {
        flex: 1,
        alignItems: "center",
    },
    profileImage: {
        height: 150,
        width: 155,
        borderRadius: 999,
        borderColor: '#F8FAE5',
        borderWidth: 2,
        top: -185,
    },
    displayName: {
        marginTop: 20,
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "bold",
        color: '#F8FAE5',
        marginBottom: 0,
    },
    displayCity: {
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "bold",
        color: '#F8FAE5',
        marginBottom: 10,
        top: -150,
    },
    input: {
        top: -15,
        alignContent: 'center',
        left: 40,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold",
        height: 100,
        weight: 100,
        width: "80%",
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#ce5e31',
        color: '#F8FAE5',
    },
    addButton: {
        position: 'absolute',
        top: 20, // Adjust the top position as needed
        right: 20, // Adjust the right position as needed
        zIndex: 1, // Ensure the button is above other content
    },
    rectangle: {
        marginLeft: 270,
        marginTop: 30,
        width: 100, // Adjust width as needed
        height: 30, // Adjust height as needed
        backgroundColor: '#ce5e31',
        borderRadius: 5, // Adjust border radius for rounded corners
        justifyContent: 'center', // Align text vertically
        alignItems: 'center', // Align text horizontally
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        alignContent: 'center',
        textAlign: 'center',
        top: -12.7,
        left: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: '#25294a',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        color: '#F8FAE5',
        paddingHorizontal: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    interestContainer: {
        backgroundColor: '#ce5e31',
        padding: 10,
        borderRadius: 50,
        marginBottom: 10,
        width: 100,
        height: 30,
    },
    interestText: {
        borderRadius: 50,
        padding: 10,
        marginTop: 10,
        width: 300,
        height: 30,
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold",
        top: -40,
        left: 47,
        color: 'white',
        backgroundColor: '#ce5e31',
        
    marginBottom: 10,

    },
    
});
