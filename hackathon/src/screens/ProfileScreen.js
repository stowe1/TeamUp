import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from '../components/supabase';
import {QueryResult, QueryData, QueryError,} from '@supabase/supabase-js';  // Import your Supabase client

export default function ProfileScreen({navigation, email}) {
    const [inputName, setInputName] = useState('');
    const [displayedName, setDisplayedName] = useState('');
    console.log('email in profile screen', email)

    const handleChangeName = (text) => {
        setInputName(text);
    };

    const handleSubmitName = () => {
        setDisplayedName(inputName);
        setInputName('');
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <StatusBar backgroundColor={COLORS.GRAY} />
            <View style={{ width: "100%" }}>
                <Image
                    source={images.background1}
                    resizeMode='cover'
                    style={{
                        height: 228,
                        width: "100%"
                    }}
                />
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                    source={images.profile}
                    resizeMode='contain'
                    style={{
                        height: 150,
                        width: 155,
                        borderRadius: 999,
                        borderColor: COLORS.NAVY_BLUE,
                        borderWidth: 2,
                        top: -185
                    }}
                />

                <Text style={{
                    color: COLORS.NAVY_BLUE,
                    marginBottom: 10
                }}>Name: {displayedName}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    onChangeText={handleChangeName}
                    value={inputName}
                    onSubmitEditing={handleSubmitName}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: "80%",
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});
