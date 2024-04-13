import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { QueryResult, QueryData, QueryError, } from '@supabase/supabase-js';  // Import your Supabase client
import { supabase } from '../components/supabase';  // Import your Supabase client
export default function SignUpScreen({ onSignUp, goBack }) {
    const navigation = useNavigation();
    const [formData, setFormData] = useState([
        { placeholder: 'First Name', value: '', key: 'firstName' },
        { placeholder: 'Last Name', value: '', key: 'lastName' },
        { placeholder: 'Age', value: '', key: 'age' },
        { placeholder: 'City', value: '', key: 'city' },
        { placeholder: 'State', value: '', key: 'state' },
        { placeholder: 'Email', value: '', key: 'email' },
        { placeholder: 'Password', value: '', key: 'password', secureTextEntry: true },
        { placeholder: 'Confirm Password', value: '', key: 'confirmPassword', secureTextEntry: true },
    ]);

    const handleInputChange = (key, value) => {
        setFormData(prevFormData =>
            prevFormData.map(item =>
                item.key === key ? { ...item, value } : item
            )
        );
    };

    const handleSignUp = async () => {
        const missingField = formData.find(item => !item.value.trim());
        if (missingField) {
            alert(`Please enter your ${missingField.placeholder}`);
            return;
        }
        const password = formData.find(item => item.key === 'password').value;
        const confirmPassword = formData.find(item => item.key === 'confirmPassword').value;
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        const userData = formData.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        const { count } = await supabase
        .from('users')  // Replace 'users' with your table name
        .select('*', { count: 'exact' });  // Select all columns and get the count

    const id = count + 1;  // Increment the id by 1
    console.log('new', id);  // Log the new id to the console
    
        const { data, error } = await supabase
        .from('users')  
        .insert([{
            id: id,  
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            Age: parseInt(userData.age, 10), // assuming age is stored as a number
            City: userData.city,
            State: userData.state,
            password: userData.password 
        }]);

    if (error) {
        alert(error.message);
        return;
    } else {
        onSignUp(); // callback on successful sign up
    }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <Image source={require('../../assets/TeamUP.png')} style={{ width: 300, height: 300, marginBottom: 30 }} />
                <Text style={styles.title}>Welcome!</Text>
                {formData.map(({ placeholder, value, key, secureTextEntry }) => (
                    <TextInput
                        key={key}
                        style={styles.input}
                        placeholderTextColor={'orange'}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        value={value}
                        onChangeText={text => handleInputChange(key, text)}
                    />
                ))}
                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goBack()}>
                    <Text style={styles.loginText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#25294a',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: 'orange',
    },
    signupButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 10,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
