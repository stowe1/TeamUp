import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function CommunityScreen({navigation}) {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.circleContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.plus}>+</Text>
                    </View>
                </View>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor="#666" />
                <View style={styles.circleContainer}>
                    <View style={styles.circle}></View>
                </View>
            </View>
            <View><Text>Community Screen</Text></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
      },
      circleContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
      circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      },
      plus: {
        fontSize: 20,
      },
      searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginLeft: 10,
      },
});