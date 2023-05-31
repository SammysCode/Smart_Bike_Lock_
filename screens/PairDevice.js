import React, { useState, useEffect, } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { collection, getDocs, getFirestore, } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";

const imagePath = '../assets/bluetooth.png';
const imageSource = require(imagePath);


function PairDevice() {
    const [device, setDevice] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // Gets current user 
    const auth = getAuth();
    // Svaes current user information in variable 
    const user = auth.currentUser;

    // Automatically calls function when screen is loaded/reloaded
    useEffect(() => {
        lookgingForDevices();
    }, []);

    // When refreshich the screen the database for new devices is done
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            lookgingForDevices();
            setRefreshing(false);
        }, 2000);
    };

    const lookgingForDevices = () => {
        // Gets Firebase
        const firestore = getFirestore();
        // Reads from the database from collection "userdata"
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
            // If there are values in deviceNr
            if (deviceNr) {
                const updatedDevice = [];
                // Going through the data retrieved to find keys that starts with "device" and then a number
                for (let i = 0; i < Object.keys(deviceNr).length; i++) {
                    if (deviceNr[`device${i}`] !== undefined) {
                        updatedDevice.push(deviceNr[`device${i}`]);
                    }
                }
                setDevice(updatedDevice);
                setIsLoading(false);
            } else {
                setDevice([]);
                setIsLoading(false);
            }
        };
        readingDatabase();
    };

    return (
        <View style={styles.container}>
            {/* The user can pull down on screen and reload the devices */}
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.leftSection}>
                    <Text style={styles.titleText}>Pair Device</Text>
                    <Image source={imageSource} style={{ width: '40%', height: '40%' }} />
                    <Text style={styles.devices}>Searching for device ...</Text>
                    <Text style={styles.underLine}>_______________________________________</Text>
                    <Text style={styles.underText}>make sure you are near your device</Text>
                </View>
                <View style={styles.middleSection}>
                    <Text style={styles.titleDevice}>Devices</Text>
                </View>
                <View style={styles.rightSection}>
                    {/* An loading circle will how until the database and devices have been fetched
After that devices will be shown as many as there are in the database, each on a new line */}
                    <View style={styles.inputView} >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <FlatList
                                data={device}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (

                                    <TouchableOpacity style={styles.devicePress} onPress={() => setSelectedDevice(item)}>
                                        <Text style={styles.foundDevices}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#ffffff',
    },
    leftSection: {
        flex: 1.3,
        gap: 10,
        paddingTop: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    middleSection: {
        flex: 0.2,
        paddingLeft: 20,
        gap: -20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomColor: 'rgba(0, 0, 0, 0.55)',
        borderBottomWidth: 2,
    },
    rightSection: {
        flex: 1,
    },
    titleText: {
        color: '#000000',
        fontWeight: 600,
        fontSize: 24,
    },
    inputView: {
        padding: 10,
        alignContent: 'flex-start',
        justifyContent: 'space-between'

    },
    devices: {
        fontWeight: 400,
        fontSize: 14,
        color: '#000000',
    },
    underLine: {
        fontWeight: 'bold',
    },
    underText: {
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.55)',
    },
    titleDevice: {
        fontWeight: 600,
        fontSize: 16,
        color: '#000000',
    },
    foundDevices: {
        paddingLeft: 10,
    },
    devicePress: {
        height: 50,
        alignContent: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: '#E9ECEF',
        borderBottomWidth: 2,
    }
})
export default PairDevice;