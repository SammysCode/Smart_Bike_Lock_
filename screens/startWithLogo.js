import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from "expo-secure-store";

const imagePath = '../assets/logo.png';
const imageSource = require(imagePath);


const StartWithLogo = ({ navigation }) => {


    useEffect(() => {
        const waitingToLoad = async () => {

            await Promise((resolve) => setTimeout(resolve, 2000));
        }
    });

    return (

        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.welcomeText}>WELCOME</Text>
                </View>
                <Image source={imageSource} />
                <View style={{ padding: 10 }}>
                    <Text style={styles.deviceText}>Let's Pair a Device</Text>
                </View>
                <Text>Loading...</Text>
                <ActivityIndicator size="large" color="white" />




            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    welcomeText: {
        fontFamily: 'Roboto',
        fontSize: 38,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    deviceText: {
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'normal',
        color: '#FFFFFF',
    }

});

export default StartWithLogo;