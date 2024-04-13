import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from './ProfileScreen';
import { Image } from 'react-native';
import { supabase } from '../components/supabase';
import { useState } from 'react';
import {QUeryResult, QueryData, QueryError} from '@supabase/supabase-js';

export default function LoginScreen({onLogin, signUp}) {


    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signUpScreen = () => {
        signUp();
        navigation.navigate('SignUp');
    };
    const handleLogin = async () => {
        
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password);
        if (error) {
            alert('No Account Found! Please Sign Up!')
            console.log(error);
            return;
        }
        onLogin();
        navigation.navigate('ProfileScreen');
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/TeamUP.png')}
                style={{ width: 300, height: 300, marginBottom: 30 }}
            />
            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor={'#ce5e31'}
                keyboardType="email-address"
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor={'#ce5e31'}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.loginButton} onPress= {handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton} onPress={signUpScreen}>
                <Text style={styles.buttonText}>Don't have an Account?      Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#25294a', // Set background color to dark blue
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white', // Set text color to white
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#ce5e31', // Set text color to white
        backgroundColor: 'black', // Set input background color to white
    },
    loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#ce5e31', // Set button color to orange
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Make buttons more rounded
        marginTop: 30,

    },
    signupButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        borderRadius: 10, // Make buttons more rounded
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
