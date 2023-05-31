import React, { useState } from 'react';
import { app } from '../firebaseConfig';
import { getApps, getApp } from "firebase/app";
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, Modal } from 'react-native';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, localPersistence } from 'firebase/auth'
import { Switch } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';



function LogInHandler() {
    const [email, setEmail] = useState('');
    const [psswrd, setPsswrd] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);

    // Gets current user 
    const auth = getAuth()

    // Handels when email and password don't match to account
    const handleIncorrectCredentials = () => {
        setModalVisible(true);
    };
    // Not all fields are filled in
    const handleEmptyFields = () => {
        setModal1Visible(true);
    };
    // Forgot password "button" pressed
    const handleForgotPWord = () => {
        setModal2Visible(true);
    };
    // Handels closing all modals
    const handleCloseModal = () => {
        setModalVisible(false);
        setModal1Visible(false);
        setModal2Visible(false);

    };
    // Handles if "Remind Me" is toggeld
    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe)


    }
    // Handels logging in
    const logingIn = () => {
        // If email and password are filled in
        if (email || psswrd) {
            // Firebase Authenticate handels sign in, retrieves usercredentials and 
            // if "Remind me" is set it saves the user credentials with SecureStore
            signInWithEmailAndPassword(auth, email, psswrd)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("Logged in with:", user.email);
                    if (rememberMe) {
                        saveUserCredentials(email, psswrd);
                    }
                })
                .catch((error) => {
                    handleIncorrectCredentials();
                    console.log('Error logging in:', error);
                });
            // User credentials are saved localy on device for automatic log in when application restarts
            const saveUserCredentials = async (email, psswrd) => {
                try {
                    await SecureStore.setItemAsync('email', email);
                    await SecureStore.setItemAsync('password', psswrd);
                } catch (error) {
                    console.log('Error saving user credentials:', error);
                }

            };
        } else {
            // if the user has not filled in email and password
            handleEmptyFields();
        }

    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} automaticallyAdjustKeyboardInsets>
                <View style={styles.container1}>
                    <View style={styles.circle} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.registrationText}>Log in</Text>
                </View>
                <View style={styles.container3}>
                    <View style={styles.inputView} >
                        <Text style={styles.inputLable}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="youremail@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}

                        />
                        <Text style={styles.inputLable}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="password"
                            autoCapitalize="none"
                            value={psswrd}
                            secureTextEntry={true}
                            onChangeText={setPsswrd}
                        />
                        <View style={{ alignContent: 'flex-end', alignItems: 'flex-end', paddingRight: 20 }}>
                            <TouchableOpacity style={styles.button} onPress={handleForgotPWord} >
                                <Text style={styles.inputLable}>Forgot Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rememberMeView}>
                        <Text style={styles.inputLable}>Remember Me:</Text>
                        <Switch value={rememberMe} onValueChange={handleRememberMeToggle} trackColor={{ false: '#ADB5BD', true: '#000000' }} thumbColor={rememberMe ? '#ffffff' : '#000000'} />
                        <View style={styles.btnView}>
                            <TouchableOpacity style={styles.loginBtn} onPress={logingIn}>
                                <Text style={styles.btnText}>Log in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal visible={modalVisible} animationType="slide" transparent>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Incorrect email or password</Text>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Modal visible={modal1Visible} animationType="slide" transparent>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Please fill in both email and password</Text>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Modal visible={modal2Visible} animationType="slide" transparent>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Please contact customer support for further assistance at: smartbikelock@email.com </Text>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff'

    },
    container1: {
        marginTop: '20%',
        padding: 10,
        justifyContent: 'space-around',
        flex: 1,
    },
    container2: {

        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        height: 200,
        justifyContent: 'space-around',
        flex: 1,
    },
    container3: {
        padding: 10,
        width: '100%',
        height: '100%',
        alignContent: 'flex-start',
        justifyContent: 'space-around',
        flex: 2,
        gap: 10,
    },
    circle: {
        position: 'absolute',
        top: -470,
        right: -50,
        width: 900,
        height: 700,
        borderRadius: 750,
        backgroundColor: 'black',
    },
    registrationText: {
        left: 0,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 32,
    },
    inputView: {
        padding: 10,
        gap: -10,
        alignContent: 'flex-start',
    },
    inputLable: {
        paddingTop: 20,
        right: -10,
        fontWeight: 'bold',
    },
    input: {
        height: 38,
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 8,
        borderRadius: 6,
        fontSize: 16,
        fontWeight: '100',
    },
    rememberMeView: {
        alignItems: "flex-start",
        gap: -10,
        padding: 10,
    },
    loginBtn: {
        width: 300,
        height: 51,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#000000',
    },
    btnText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#ffffff',
    },
    btnView: {
        margin: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalText: {
        backgroundColor: '#ffffff',
        padding: 50,
        borderRadius: 8,
        fontSize: 16,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
        width: 100,
        height: 51,
        backgroundColor: '#000000',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default LogInHandler;