import { Component } from 'ionicons/dist/types/stencil-public-runtime';
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { supabase } from '../components/supabase';
import {QueryResult, QueryData, QueryError,} from '@supabase/supabase-js';  // Import your Supabase client

export default function ProfileScreen({navigation}) {

    ComponentDidMount() {
    

    }
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
