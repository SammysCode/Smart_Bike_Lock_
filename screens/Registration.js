import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Switch, Modal } from 'react-native';
import { app } from '../firebaseConfig';
import { getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';




function Registration({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [psswrd, setPsswrd] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [confirmPsswrd, setConfirmPsswrd] = useState("");
    const [pNumber, setPNumber] = useState("");
    const [deviceNr, setDeviceNr] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);

    const auth = getAuth();
    const firestore = getFirestore();

    const validatePassword = (password) => {
        // Regular expressions for validation
        const uppercaseRegex = /^(?=.*[A-Z])/;
        const lowercaseRegex = /^(?=.*[a-z])/;
        const numberRegex = /^(?=.*\d)/;
        const specialCharRegex = /^(?=.*[!@#$%^&*])/;
        const lengthRegex = /^.{6,}$/;

        // Check password against each validation requirement
        const isUppercaseValid = uppercaseRegex.test(password);
        const isLowercaseValid = lowercaseRegex.test(password);
        const isNumberValid = numberRegex.test(password);
        const isSpecialCharValid = specialCharRegex.test(password);
        const isLengthValid = lengthRegex.test(password);

        // Check if all requirements are met
        const isPasswordValid =
            isUppercaseValid &&
            isLowercaseValid &&
            isNumberValid &&
            isSpecialCharValid &&
            isLengthValid;

        setIsPasswordValid(isPasswordValid);
    };
    // Handels the validation of password
    const handlePasswordChange = (text) => {
        setPsswrd(text);
        validatePassword(text);
    };
    // Handles if "Remind Me" is toggeld
    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe)
    }
    // Handels when password and confirm password do not match
    const handleIncorrectPWord = () => {
        setModalVisible(true);
    };
    // Handels when all fields aren't filled in
    const handleFillInAllFields = () => {
        setModal1Visible(true);
    };
    // Handels when an account has been set up
    const handleAccountSetUp = () => {
        setModal2Visible(true);
    };
    // Handels closing all modals
    const handleCloseModal = () => {
        setModalVisible(false);
        setModal1Visible(false);
    };

    const RegistrationHandle = ({ navigation }) => {

        // If all fields are not filled in
        if (fullName !== '' && email !== '' && psswrd !== '' && confirmPsswrd !== '' && pNumber !== '' && deviceNr !== '') {
            // Checks if the password is validated 
            if (isPasswordValid) {
                // Password and confirmpassword matches
                if (psswrd === confirmPsswrd) {
                    // Creates a user with email and password
                    createUserWithEmailAndPassword(auth, email, psswrd).then((userCredentials) => {
                        const user = userCredentials.user;
                        // Creates a document with the user ID within the collection "userdata", saving the user data
                        setDoc(doc(firestore, 'userdata', user.uid), {
                            fullName: fullName,
                            email: email,
                            userID: user.uid,
                            phoneNumber: pNumber,
                            device0: deviceNr,
                            lockState: true,
                            userCreated: Date.now(),
                        });
                        // The user is signed in automatically after creating an account
                        // This sign in is added because of an error I was recieving
                        signInWithEmailAndPassword(auth, email, psswrd)
                            .then((userCredential) => {
                                const user = userCredential.user;
                                console.log("Logged in with:", user.email);
                                // If the "Remenber me" is toggeled the user credentials are saved on the device securely
                                if (rememberMe) {
                                    saveUserCredentials(email, psswrd);
                                }
                            })
                            .catch((error) => {
                                handleIncorrectCredentials();
                                console.log('Error logging in:', error);
                            });

                        // shows a nnotification that the account has been set up
                        handleAccountSetUp();


                    }).catch((error) => {
                        console.log('This error is from creating user', error)
                        alert('Email already in use')
                    })
                    // Passwords did not match
                } else {
                    handleIncorrectPWord();
                }
                // Not a valid password
            } else {
                alert('Please fill in a valid password')
            }
            // All fields arent filled in
        } else {
            handleFillInAllFields();
        }
        // Function saves user credentials on device
        const saveUserCredentials = async (email, psswrd) => {
            try {
                await SecureStore.setItemAsync('email', email);
                await SecureStore.setItemAsync('password', psswrd);
                console.log('User credentials saved.');
            } catch (error) {
                console.log('Error saving user credentials:', error);
            }
        };

    };

    return (
        <View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }} automaticallyAdjustKeyboardInsets>
                <View style={styles.circle} />
                <View style={styles.container}>
                    <View style={styles.container1}>
                        <View style={styles.circle} />
                        <View style={styles.container2}>
                            <Text style={styles.registrationText}>Register</Text>
                        </View>
                        <View style={styles.container3}>
                            <View style={styles.inputView} >
                                <Text style={styles.inputLable}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='full name'
                                    placeholderTextColor='black'
                                    onChangeText={(text) => setFullName(text)}
                                    value={fullName}
                                />
                                <Text style={styles.inputLable}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='youremail@email.com'
                                    autoCapitalize="none"
                                    placeholderTextColor='black'
                                    onChangeText={(text) => setEmail(text.replace(/ /g, ""))}
                                    value={email}
                                    keyboardType="email-address"

                                />
                                <Text style={styles.inputLable}>Password</Text>
                                {/* As long as the password does not consist of set character an error text will show */}
                                <TextInput
                                    style={[
                                        styles.input,
                                        !isPasswordValid && styles.inputError,
                                    ]}
                                    placeholder="enter password"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    onChangeText={handlePasswordChange}
                                    value={psswrd}
                                />
                                {!isPasswordValid && (
                                    <Text style={styles.errorText}>
                                        Password must contain at least one uppercase letter (A-Z) {"\n"}One lowercase letter (a-z) {"\n"}One number (0-9) {"\n"}One special character (!@#$%^&*) {"\n"}Be at least 6 characters long
                                    </Text>
                                )}
                                <Text style={styles.inputLable}>Confirm Password</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='confirm password'
                                    secureTextEntry={true}
                                    onChangeText={(text) => setConfirmPsswrd(text.replace(/ /g, ""))}
                                    autoCapitalize="none"
                                    placeholderTextColor='black'
                                    value={confirmPsswrd}
                                />
                                <Text style={styles.inputLable}>Phone Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='phone number'
                                    autoCapitalize="none"
                                    placeholderTextColor='black'
                                    onChangeText={(text) => setPNumber(text.replace(/ /g, ""))}
                                    value={pNumber}
                                    keyboardType='numeric'
                                />
                                <Text style={styles.inputLable}>Device Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='device number'
                                    autoCapitalize="none"
                                    placeholderTextColor='black'
                                    onChangeText={(text) => setDeviceNr(text)}
                                    value={deviceNr}
                                />
                                <View style={styles.rememberMeView}>
                                    <Text style={styles.inputLable}>Remember Me:</Text>
                                    <Switch value={rememberMe} onValueChange={handleRememberMeToggle} trackColor={{ false: '#ADB5BD', true: '#000000' }} thumbColor={rememberMe ? '#ffffff' : '#000000'} />
                                </View>
                                <TouchableOpacity style={styles.signUpBtn} onPress={RegistrationHandle}>
                                    <Text style={styles.signUpText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <Modal visible={modalVisible} animationType="slide" transparent>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.modalText}> Password Do Not Match</Text>
                                    <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal visible={modal1Visible} animationType="slide" transparent>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.modalText}> Please fill in all fields</Text>
                                    <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal visible={modal2Visible} animationType="slide" transparent>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.modalText}> Account set up with device: ${deviceNr} </Text>
                                    <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>
                    </View>
                </View >
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff'

    },
    container1: {
        marginTop: 10,
        padding: 10,
        justifyContent: 'space-around',
        display: 'flex',
    },
    container2: {

        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        padding: 10,
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
        right: -30,
        width: 900,
        height: 700,
        borderRadius: 750,
        backgroundColor: 'black',
    },
    goBack: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    regTittlePlacment: {
        margin: 30,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#CB48B7'


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
        alignContent: 'flex-start'

    },
    inputLable: {
        paddingTop: 20,
        right: -10,
        fontWeight: 'bold'

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
    signUpBtn: {
        width: 300,
        height: 51,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#000000',
    },
    signUpText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#ffffff'
    },
    inputError: {
        borderColor: '#DC3545',
    },
    errorText: {
        paddingLeft: 10,
        color: '#DC3545',
    },
    rememberMeView: {
        alignItems: "flex-start",
        gap: -10,
        marginTop: 10,
        padding: 10

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


export default Registration;