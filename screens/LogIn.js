import React, { useState } from 'react';
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, } from 'react-native';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, localPersistence } from 'firebase/auth'
import { Switch } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';



function LogInHandler() {
    const [email, setEmail] = useState('');
    const [psswrd, setPsswrd] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const auth = getAuth()
    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe)


    }

    const logingIn = () => {
        console.log("Logging in...")

        // signInWithEmailAndPassword(auth, email, psswrd).then((userCredentials) => {
        //     const user = userCredentials.user;
        //     console.log("Logged in with:", user.email);
        // }).catch((error) => {
        //     console.log('This error is from creating user', error)
        // })
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

        // console.log('You have now been signed it as:', user)
        // if (rememberMe) {
        //     setPersistence(auth, localPersistence)
        //         .then(() => {
        //             console.log("Logged in with:", user.email, 'in memory', userCredentials.user);
        //             return signInWithEmailAndPassword(auth, email, psswrd);
        //         })
        //         .catch((error) => {
        //             const errorCode = error.code;
        //             const errorMessage = error.message;
        //         });
        // } else {
        //     setPersistence(auth, browserSessionPersistence)
        //         .then(() => {
        //             console.log("Logged in with:", user.email, 'in memory', userCredentials.user);
        //             return signInWithEmailAndPassword(auth, email, psswrd);
        //         })
        //         .catch((error) => {
        //             // Handle Errors here.
        //             const errorCode = error.code;
        //             const errorMessage = error.message;
        //         });
        // }
    }

    const forgotPword = () => {

        alert('Please contact customer support for further assistance at: \n smartbikelock@email.com ')

    }



    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} automaticallyAdjustKeyboardInsets>

                {/* <View style={styles.container}> */}
                {/* <View style={styles.circle} /> */}
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
                        <TouchableOpacity style={styles.button} onPress={forgotPword} >
                            <Text style={styles.inputLable}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "flex-start", gap: 10, marginTop: 10, padding: 10 }}>
                        <Text style={styles.inputLable}>Remember Me:</Text>
                        <Switch value={rememberMe} onValueChange={handleRememberMeToggle} trackColor={{ false: '#ADB5BD', true: '#000000' }} thumbColor={rememberMe ? '#ffffff' : '#000000'} />
                    </View>

                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.loginBtn} onPress={logingIn}>
                            <Text style={styles.btnText}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* </View> */}
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
        // width: '100%',
        // height: 200,
        // color: '#ff0000',
        justifyContent: 'space-around',
        flex: 1,
        // ' backgroundColor: 'blue','
        // display: 'flex',
    },
    container2: {

        marginTop: 10,
        marginLeft: 20,
        padding: 10,
        width: '100%',
        height: 200,
        // color: '#ff0000',

        justifyContent: 'flex-start',
        flex: 0.5,
        // backgroundColor: 'orange',
        // flexGrow: 2,
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
        // color: 'white',
        borderRadius: 6,
        fontSize: 16,
        fontWeight: '100',
        // fontStyle: 'italic'
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
        fontSize: 16,
        fontWeight: '900',
        color: '#ffffff'

    },
    btnView: {
        // margin: 20,
        alignItems: 'center',
        // // justifyContent: 'center',
        // backgroundColor: 'green'

    },
});


export default LogInHandler;