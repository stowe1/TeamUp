import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView,
  Platform, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
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

        const { email, password: signUpPassword } = formData.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        let { user, session, error } = await supabase.auth.signUp({
            email,
            password: signUpPassword
        });

        if (error) {
            alert(error.message);
            return;
        }

        onSignUp();
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Image source={require('../../assets/TeamUP.png')} style={styles.logo} />
                <Text style={styles.title}>Welcome!</Text>
                <View style={styles.formContainer}>
                    <ScrollView>
                        {formData.map(({ placeholder, value, key, secureTextEntry }) => (
                            <TextInput
                                key={key}
                                style={styles.input}
                                placeholderTextColor={'#ce5e31'}
                                placeholder={placeholder}
                                secureTextEntry={secureTextEntry}
                                value={value}
                                onChangeText={text => handleInputChange(key, text)}
                            />
                        ))}
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupButton} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>Already have an account? Login</Text>
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
    contentContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    formContainer: {
        width: '90%',
        height: 250,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#ce5e31',
        backgroundColor: 'black',
    },
    loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#ce5e31',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
    signupButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
