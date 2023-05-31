import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import * as SecureStore from 'expo-secure-store';

const LockAndUnlockHandler = ({ navigation }) => {
    useEffect(() => {
        readingDatabase();

    }, []);

    const [isLocked, setIsLocked] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();


    const readingDatabase = async () => {
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
            console.log('deviceArr:', deviceArr)
        } catch (error) {
            console.log('Error reading database:', error);
        }
        // Saving the fetched data from database into a dictionary and save the lockState in a variable
        const dict = deviceArr[0];
        const lockeState = dict['lockState'];
        setIsLocked(lockeState);
        setIsLoading(false);
    }
    // Changes the lock state of the lock in the database when the lock/unlock button is pressed
    const lockingLock = () => {
        const newLockState = !isLocked;
        updateDoc(doc(firestore, 'userdata', user.uid), {
            lockState: newLockState,
        });
        setIsLocked(newLockState);
    };
    // Deleting user credentials from phone so the user is no longer automatically signed in when starting the application
    async function removeUserCredentials() {
        try {
            await SecureStore.deleteItemAsync('email');
            await SecureStore.deleteItemAsync('password');
            console.log('User credentials removed.');
        } catch (error) {
            console.log('Error removing user credentials:', error);
        }
    };
    // Loggs out the user 
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

    };


    return (
        <View style={[styles.container, {
            backgroundColor: isLocked ? 'black' : 'white',
        },]}>
            <View style={styles.leftSection}>
                <TouchableOpacity onPress={logout}>
                    <Text style={[styles.buttonText, {
                        color: isLocked ? 'white' : 'black',
                    },]}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.middleSection}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#000000" />
                ) : (
                    <TouchableOpacity
                        style={[
                            styles.circle,
                            {
                                backgroundColor: isLocked ? 'green' : 'red',
                            },
                        ]}
                        onPress={lockingLock}
                    >
                        <View style={styles.innerCircle}>
                            <Text style={[styles.buttonText, {
                                borderColor: isLocked ? 'white' : 'black',
                            },]}>{isLocked ? 'Locked' : 'Unlocked'}</Text>
                            <Text style={[styles.buttonUnderText, {
                                borderColor: isLocked ? 'white' : 'black',
                            },]}>{isLocked ? 'Press To Unlock' : 'Press To Unlock'}</Text>
                        </View>
                    </TouchableOpacity>
                )}
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
    },
    middleSection: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightSection: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    registrationText: {
        left: 0,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 40,
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