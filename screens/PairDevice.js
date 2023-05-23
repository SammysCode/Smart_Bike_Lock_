import React, { createRef, useState, useEffect, } from "react";
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, Modal, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { collection, getDocs, getFirestore, query, where, onSnapshot, doc } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";

const imagePath = '../assets/bluetooth.png';
const imageSource = require(imagePath);



function PairDevice() {
    const [device, setDevice] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        lookgingForDevices();
    }, []);

    useEffect(() => {
        console.log("sss", device);
    }, [device]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            lookgingForDevices();
            setRefreshing(false);
        }, 2000); // Delay for 2 seconds (adjust as needed)
    };

    const lookgingForDevices = () => {

        const firestore = getFirestore();

        async function readingDatabase() {
            const colRef = collection(firestore, 'userdata');
            const deviceArr = [];

            try {
                const docsSnap = await getDocs(colRef);

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

            console.log('Device array:', deviceArr);



            const deviceNr = deviceArr[0];

            if (deviceNr) {
                const updatedDevice = [];

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

                    <View style={styles.inputView} >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#0000ff" /> // Show loading indicator while device list is loading
                            // ) : device.length === 0 ? (
                            //     <Text>No devices found</Text>
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
                            //     ItemSeparatorComponent={() => <View style={styles.itemSeparator} />
                            // }
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
        // backgroundColor: 'yellow',
    },
    middleSection: {
        flex: 0.2,
        paddingLeft: 20,
        gap: -20,
        // padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'pink',
        borderBottomColor: 'rgba(0, 0, 0, 0.55)',
        borderBottomWidth: 2,
    },
    rightSection: {
        flex: 1,
        // justifyContent: 'center',
        // paddingHorizontal: 20,
        // backgroundColor: 'red',
    },
    titleText: {
        color: '#000000',
        fontWeight: 600,
        fontSize: 24,
    },
    inputView: {
        padding: 10,
        // paddingLeft: 20,
        // gap: 10,
        // backgroundColor: 'blue',
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
    itemSeparator: {
        // paddingBottom: 10,
        height: 20, // Adjust the height to set the desired spacing
        borderColor: '#E9ECEF',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        // backgroundColor: 'blue'
    },
    foundDevices: {
        paddingLeft: 10,
        // backgroundColor: 'red',
    },
    devicePress: {
        height: 50,
        alignContent: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: '#E9ECEF',
        borderBottomWidth: 2,
        // backgroundColor: 'yellow'
    }









})
export default PairDevice;