import React, { createRef, useState } from "react";
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, Switch } from 'react-native';
import { app } from '../firebaseConfig';
import { getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, browserSessionPersistence, setPersistence, inMemoryPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, getDoc, doc, getDocs, query, where, Timestamp, setDoc } from 'firebase/firestore';




function Registration({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [psswrd, setPsswrd] = useState("");
    const [confirmPsswrd, setConfirmPsswrd] = useState("");
    const [pNumber, setPNumber] = useState("");
    const [deviceNr, setDeviceNr] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const deviceArray = [];
    const emailArray = [];

    const auth = getAuth();
    const firestore = getFirestore();

    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe)


    }


    async function checkDeviceNumber() {
        const q = query(collection(firestore, 'userdata'), where('deviceNumer', '==', deviceNr));
        try {
            const qSnap = await getDocs(q);
            qSnap.forEach((doc) => {
                deviceArray.push(doc.id)
                // alert('Device already registered');
            });
        } catch (error) {
            console.log(error);
        }

    };


    async function checkEmail() {
        const q = query(collection(firestore, 'userdata'), where('email', '==', email));
        try {
            const qSnap = await getDocs(q);
            qSnap.forEach((doc) => {
                deviceArray.push(doc.id)
                alert('Email already registered');
            });
        } catch (error) {
            console.log(error);
        }

    };
    function goingBack() { navigation.navigate('login'); };

    const RegistrationHandle = ({ navigation }) => {
        console.log("Registration in progress")
        checkDeviceNumber();
        checkEmail();
        if (deviceArray.length === 0) {
            if (emailArray.length === 0) {
                if (psswrd === confirmPsswrd) {
                    createUserWithEmailAndPassword(auth, email, psswrd).then((userCredentials) => {
                        const user = userCredentials.user;

                        setDoc(doc(firestore, 'userdata', user.uid), {
                            fullName: fullName,
                            email: email,
                            userID: user.uid,
                            phoneNumber: pNumber,
                            device0: deviceNr,
                            userCreated: Date.now(),
                        });
                    }).catch((error) => {
                        console.log('This error is from creating user', error)
                    })
                    // End of IF passwords entered are the same
                } else {
                    alert('Passwords did not match')
                }
                // End of IF emailArray check
            } else {
                alert('Email is already registerd')
            }
            // End of IF deviceArray check
        } else {
            alert('Device is already registered')
        }

        // if (setPersistence) {
        //     setPersistence(auth, browserSessionPersistence)
        //         .then(() => {
        //             return signInWithEmailAndPassword(auth, email, psswrd);
        //         })
        //         .catch((error) => {
        //             const errorCode = error.code;
        //             const errorMessage = error.message;
        //         });

        //     window.alert(`Account set up with device: ${deviceNr} `);
        //     goingBack();
        //     console.log("Registration done")
        // } else {
        //     setPersistence(auth, inMemoryPersistence)
        //         .then(() => {
        //             return signInWithEmailAndPassword(auth, email, psswrd);
        //         })
        //         .catch((error) => {
        //             const errorCode = error.code;
        //             const errorMessage = error.message;
        //         }); }


        signInWithEmailAndPassword(auth, email, psswrd)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in with:", user.email);
                if (rememberMe) {
                    saveUserCredentials(email, psswrd);
                }

            })
            .catch((error) => {
                console.log('Error logging in:', error);
            });

        const saveUserCredentials = async (email, psswrd) => {
            try {
                await SecureStore.setItemAsync('email', email);
                await SecureStore.setItemAsync('password', psswrd);
                console.log('User credentials saved.');
            } catch (error) {
                console.log('Error saving user credentials:', error);
            }
        };



        window.alert(`Account set up with device: ${deviceNr} `);
        goingBack();
        console.log("Registration done")



    };

    return (
        <View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, }} automaticallyAdjustKeyboardInsets>
                <View style={styles.circle} />
                <View style={styles.container}>

                    <Text>----------------</Text>
                    <Text>----------------</Text>
                    <Text>----------------</Text>
                    <View style={styles.container1}>
                        <View style={styles.circle} />
                        {/* <TouchableOpacity onPress={() => {
                            navigation.navigate('loginOrRegister');
                        }}>
                            <Text style={styles.goBack}> Go back </Text>
                        </TouchableOpacity> */}
                        <View style={styles.container2}>
                            <Text style={styles.registrationText}>Register</Text>
                        </View>
                        <View style={styles.container3}>
                            <View style={styles.inputView} >
                                <Text style={styles.inputLable}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='full name'
                                    // autoCapitalize
                                    placeholderTextColor='black'
                                    onChangeText={(text) => setFullName(text)}
                                    value={fullName}
                                //onChangeText={val => this.onChangeText('username', val)}
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

                                // onChangeText={val => this.onChangeText('email', val)}
                                />
                                <Text style={styles.inputLable}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='password'
                                    // secureTextEntry={true}
                                    secureTextEntry
                                    onChangeText={(text) => setPsswrd(text.replace(/ /g, ""))}
                                    value={psswrd}
                                    autoCapitalize="none"
                                    placeholderTextColor='black'
                                // onChangeText={val => this.onChangeText('password', val)}
                                />
                                <Text style={styles.inputLable}>Re Enter Password</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='confirm password'
                                    secureTextEntry={true}
                                    onChangeText={(text) => setConfirmPsswrd(text.replace(/ /g, ""))}
                                    autoCapitalize="none"
                                    placeholderTextColor='black'
                                    value={confirmPsswrd}
                                //onChangeText={val => this.onChangeText('password', val)}
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
                                //onChangeText={val => this.onChangeText('phone_number', val)}
                                />
                                <Text style={styles.inputLable}>Device Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='device number'
                                    autoCapitalize="none"
                                    placeholderTextColor='black'
                                    onChangeText={(text) => setDeviceNr(text)}
                                    value={deviceNr}
                                //onChangeText={val => this.onChangeText('phone_number', val)}
                                />
                                <View style={{ alignItems: "flex-start", gap: -10, marginTop: 10, padding: 10 }}>
                                    <Text style={styles.inputLable}>Remember Me:</Text>
                                    <Switch value={rememberMe} onValueChange={handleRememberMeToggle} trackColor={{ false: '#ADB5BD', true: '#000000' }} thumbColor={rememberMe ? '#ffffff' : '#000000'} />
                                </View>

                            </View>
                            <TouchableOpacity style={styles.signUpBtn} onPress={RegistrationHandle}>
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </TouchableOpacity>

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
        height: '100%'

    },
    container1: {
        marginTop: 10,
        padding: 10,
        // width: '100%',
        // height: 200,
        // color: '#ff0000',
        justifyContent: 'space-around',
        // flex: 1,
        // backgroundColor: 'blue',
        display: 'flex',
    },
    container2: {

        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        width: '100%',
        height: 200,
        // color: '#ff0000',
        justifyContent: 'space-around',
        flex: 1,
        // backgroundColor: 'orange',
        flexGrow: 2,
    },
    container3: {
        // marginTop: 10,
        padding: 10,
        width: '100%',
        height: '100%',
        // color: '#ff0000',
        alignContent: 'flex-start',
        justifyContent: 'space-around',
        flex: 2,
        gap: 10,
        // backgroundColor: 'red',
    },
    circle: {
        position: 'absolute',
        top: -470,
        right: -30,
        width: 900,
        height: 700,
        borderRadius: 750,
        backgroundColor: 'black',
        // transform: [{ rotate: '-20,96deg' }]
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    goBack: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    regTittlePlacment: {
        // flex: 2,
        margin: 30,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#CB48B7'


    },
    registrationText: {
        // flex: 1,
        left: 0,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 32,

        // Fontfamily: 'Roboto',
        // lineHeight: 47,
        // align: 'left',
        // verticalAlign: 'top',
    },
    inputView: {
        padding: 10,
        gap: -10,
        // backgroundColor: 'blue',
        alignContent: 'flex-start'

    },
    inputLable: {
        paddingTop: 20,
        right: -10,
        fontWeight: 'bold'

    },
    input: {

        // width: '90%',
        height: 38,
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 8,
        // color: 'grey',
        borderRadius: 6,
        fontSize: 16,
        fontWeight: '100',
        // fontStyle: 'italic'
    },
    signUpBtn: {
        // padding: 40,
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
    }
});


export default Registration;