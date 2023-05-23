import React from "react";
import { useState } from "react";
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';

const LockAndUnlockHandler = ({ navigation }) => {

    const [isLocked, setIsLocked] = useState(true);

    const onPressButton = () => {
        setIsLocked(!isLocked);
    };
    async function removeUserCredentials() {
        try {
            await SecureStore.deleteItemAsync('email');
            await SecureStore.deleteItemAsync('password');
            console.log('User credentials removed.');
        } catch (error) {
            console.log('Error removing user credentials:', error);
        }
    };


    function logout() {
        const auth = getAuth();
        const user = auth.currentUser;

        signOut(auth)
            .then(() => {
                console.log(user.uid);
                removeUserCredentials();
                // navigation.navigate('loginOrRegister');
            }).catch((error) => {
                console.log(error)
            });

    }

    return (
        <View style={[styles.container, {
            backgroundColor: isLocked ? 'black' : 'white',
        },]}>
            <View style={styles.leftSection}>
                <TouchableOpacity onPress={logout}>
                    <Text style={[styles.buttonText, {
                        color: isLocked ? 'white' : 'black',
                        // borderColor: isLocked ? 'white' : 'black',
                    },]}>Log Out</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.middleSection}>
                <TouchableOpacity
                    style={[
                        styles.circle,
                        {
                            backgroundColor: isLocked ? 'green' : 'red',
                            // borderColor: isLocked ? 'white' : 'black',
                        },
                    ]}
                    onPress={onPressButton}
                >
                    <View style={styles.innerCircle}>
                        <Text style={[styles.buttonText, {
                            // color: isLocked ? 'white' : 'black',
                            borderColor: isLocked ? 'white' : 'black',
                        },]}>{isLocked ? 'Locked' : 'Unlocked'}</Text>
                        <Text style={[styles.buttonUnderText, {
                            // color: isLocked ? 'white' : 'black',
                            borderColor: isLocked ? 'white' : 'black',
                        },]}>{isLocked ? 'Press To Unlock' : 'Press To Unlock'}</Text>
                    </View>
                </TouchableOpacity>

            </View>


        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#000000',
        paddingTop: 20

    },
    leftSection: {
        flex: 0.5,
        margin: 20,
        paddingTop: 20,
        padding: 10,
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        // backgroundColor: 'yellow',
    },
    middleSection: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: 'pink',
    },
    rightSection: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        // backgroundColor: 'red',
    },
    // circle: {
    //     position: 'absolute',
    //     top: -320,
    //     right: -50,
    //     width: 900,
    //     height: 700,
    //     borderRadius: 750,
    //     backgroundColor: 'black',
    // },
    registrationText: {
        left: 0,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 40,
    },
    inputView: {
        gap: -10,
        // backgroundColor: 'blue',
        alignContent: 'flex-start'

    },
    inputLable: {
        right: -10,
        fontWeight: 'bold'

    },
    input: {

        // width: '90%',
        // height: '20%',
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 8,
        // color: 'white',
        borderRadius: 6,
        fontSize: 16,
        fontWeight: '100',
        fontStyle: 'italic'
    },
    loginBtn: {
        width: '50%',
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#000000',
    },
    btnText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#ffffff',
        // textDecorationLine: 'underline',

    },
    test: {
        flex: 1,
        // height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    circle: {
        width: 300,
        height: 300,
        borderRadius: 300,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        padding: 5,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonUnderText: {

        color: '#ADB5BD',
        fontSize: 12,
        // fontStyle: 'italic',
    },
    innerCircle: {
        width: 275,
        height: 275,
        borderRadius: 250,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    logOutBtn: {

        width: '30%',
        height: '16%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#000000',
    },
});

export default LockAndUnlockHandler;