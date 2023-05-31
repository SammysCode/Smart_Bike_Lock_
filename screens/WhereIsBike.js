import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, } from 'react-native';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, localPersistence } from 'firebase/auth'
import { collection, getDocs, getFirestore, } from 'firebase/firestore';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { SelectList } from 'react-native-dropdown-select-list';
import { Dropdown } from 'react-native-element-dropdown';
import RNPickerSelect from 'react-native-picker-select';

const imagePath = '../assets/blogo6.png';
const imageSource = require(imagePath);

function WhereIsBike() {

    // Does nothing but display a custom marker

    return (
        <View style={styles.container}>
            <View style={styles.maps}>
                <View style={styles.containerMap}>

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 55.863426086619675,
                            longitude: 9.837198617457977,
                            latitudeDelta: 0.010,
                            longitudeDelta: 0.010,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: 55.863426086619675,
                                longitude: 9.837198617457977,
                            }} image={imageSource}
                        />

                    </MapView>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    maps: {
        flex: 1,
        backgroundColor: 'pink'
    },
    containerMap: {
        ...StyleSheet.absoluteFillObject,

        flex: 1,
        backgroundColor: 'black',

        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});


export default WhereIsBike;