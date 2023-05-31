import React, { useState } from 'react';
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, Modal } from 'react-native';
import { app } from '../firebaseConfig';
import { getApps, getApp } from "firebase/app";
import { getAuth, updatePassword } from 'firebase/auth'
import { getFirestore, set, getDocs, ref, collection, updateDoc, doc } from 'firebase/firestore';



function UppdatingSettings({ navigation }) {
    const [psswrd, setPsswrd] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [confirmPsswrd, setConfirmPsswrd] = useState('');
    const [device, setDevice] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modal3Visible, setModal3Visible] = useState(false);
    const [modal4Visible, setModal4Visible] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();

    // Validates password the user is typing 
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
    // Handels when password and confirm password doesn't match
    const handleIncorrectPWord = () => {
        setModalVisible(true);
    };
    // Handles when the password was uppdated
    const handleUpdatedPWord = () => {
        setModal2Visible(true);
    };
    // Handels notifying a new device has been added 
    const handleUpdatedDevice = () => {
        setModal3Visible(true);
    };
    // Handels when necessary fields have not been filled in
    const handleNothingToSave = () => {
        setModal4Visible(true);
    };
    // Closes all modals
    const handleCloseModal = () => {
        setModalVisible(false);
        setModal2Visible(false);
        setModal3Visible(false);
        setModal4Visible(false);
    };



    async function readingDatabase() {
        const colRef = collection(firestore, 'userdata');
        const deviceArr = [];

        try {
            const docsSnap = await getDocs(colRef);
            // Getting the document where the unique user ID is the name of it
            if (docsSnap.docs.length > 0) {
                docsSnap.forEach(doc => {
                    if (doc.id === user.uid) {
                        deviceArr.push(doc.data());
                    }
                });
            }
        } catch (error) {
            console.log('Error reading database:', error);
        }
        // Saving the fetched data from database into a dictionary
        const deviceNr = deviceArr[0];
        const updatedDevice = [];
        if (deviceNr) {
            // Going through the data retrieved to find keys that starts with "device" and then a number
            for (let i = 0; i < Object.keys(deviceNr).length; i++) {
                if (deviceNr[`device${i}`] !== undefined) {
                    updatedDevice.push(deviceNr[`device${i}`]);
                }
            }
            setDevice(updatedDevice);
            // Checks if the device about to get registered is already in the users database 
            // if not it will update the database with a new device
            if (updatedDevice.includes(device)) {
                alert(`The device ${device} has already been registered`)
            } else {
                const nrOfDevices = updatedDevice.length
                var deviceAddDB = ['device' + nrOfDevices];
                deviceAddDB = deviceAddDB[0];

                updateDoc(doc(firestore, 'userdata', user.uid), {
                    [deviceAddDB]: device,
                    userUpdated: Date.now()
                });

                handleUpdatedDevice();
                console.log('Device updated')
            }
        } else {
            setDevice([]);
        }
    };

    const uppdatingPword = () => {
        if (isPasswordValid) {
            // Checks that the entered passwords are mathcing 
            if (psswrd === confirmPsswrd) {

                const auth = getAuth();
                const user = auth.currentUser;
                console.log("user", user)
                updatePassword(user, psswrd).then(() => {


                }).catch((error) => {
                    alert('An error accured when trying to update the password. Please try again.')
                    console.log(error)
                });
                // Profile updated
                handleUpdatedPWord();
                // Updates the database with a timestamp when the user details have been updated
                updateDoc(doc(firestore, 'userdata', user.uid), {
                    userUpdated: Date.now()
                });
            } else {
                handleIncorrectPWord();
            }

            // If the passwords do not match it will notify the user
        } else {
            alert('Please fill in a valid password')
        };

    };

    const uppdatingAccount = () => {

        // If the user only has entered text in the password fields - updates passwords and empties the fields 
        if (device.trim() === '' && psswrd.trim() !== '' && confirmPsswrd.trim() !== '') {

            console.log('run uppdating password')
            uppdatingPword();
            setPsswrd('');
            setConfirmPsswrd('');

            // If the user has only enetered text in the new device - updates the devices and empries the fields
        } else if (device.trim() !== '' && psswrd.trim() === '' && confirmPsswrd.trim() === '') {

            console.log('update devices')
            readingDatabase();
            setDevice('');
            // Updates both password and device and empties the fields
        } else if (device.trim() !== '' && psswrd !== '' && confirmPsswrd !== '') {

            console.log('uppdate both device and password')
            uppdatingPword();
            setDevice('');
            readingDatabase();
            setPsswrd('');
            setConfirmPsswrd('');

            // When all fieslda are empty or not enough fields have text (Password/confirm password)
        } else {
            handleNothingToSave();
        }

    };





    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} automaticallyAdjustKeyboardInsets>
                <View style={styles.circle} />
                <View style={styles.container}>
                    <View style={styles.container1}>
                        <View style={styles.circle} />
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.titleText}>Settings</Text>
                    </View>
                    <View style={styles.container3}>
                        <View style={styles.inputView} >
                            <Text style={styles.inputLable}>New Device</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="new device number"
                                value={device}
                                onChangeText={setDevice}
                            />
                            {/* As long as the password does not consist of set character an error text will show */}
                            <Text style={styles.inputLable}> New Password</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    !isPasswordValid && styles.inputError,
                                ]}
                                placeholder="new password"
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
                                placeholder="confirm password"
                                value={confirmPsswrd}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={setConfirmPsswrd}
                            />
                        </View>
                        <View style={styles.btnView}>
                            <TouchableOpacity style={styles.saveBtn} onPress={uppdatingAccount}>
                                <Text style={styles.btnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Information modals for the user */}
                        <Modal visible={modalVisible} animationType="slide" transparent>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}> Password Do Not Match</Text>
                                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <Modal visible={modal2Visible} animationType="slide" transparent>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}> Password updated</Text>
                                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <Modal visible={modal3Visible} animationType="slide" transparent>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}> Device updated</Text>
                                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <Modal visible={modal4Visible} animationType="slide" transparent>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}> Nothing to save or both password fields have not been filled in</Text>
                                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                </View >
            </ScrollView>
        </View >
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
        marginLeft: 20,
        padding: 10,
        width: '100%',
        height: 200,
        justifyContent: 'center',
        flex: 0.5,
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
        height: 730,
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
    titleText: {
        left: 0,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 40,
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
    btnView: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    saveBtn: {
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
        color: '#ffffff'
    },
    inputError: {
        borderColor: '#DC3545',
    },
    errorText: {
        paddingLeft: 10,
        color: '#DC3545',
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


export default UppdatingSettings;