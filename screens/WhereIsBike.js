import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, } from 'react-native';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, localPersistence } from 'firebase/auth'
import { collection, getDocs, getFirestore, } from 'firebase/firestore';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { SelectList } from 'react-native-dropdown-select-list';
import { Dropdown } from 'react-native-element-dropdown';
import RNPickerSelect from 'react-native-picker-select';

const imagePath = '../assets/blogo4.png';
const imageSource = require(imagePath);

function WhereIsBike() {

    const auth = getAuth();
    const user = auth.currentUser;

    const [selectedBike, setSelectedBike] = useState('');
    const [number, setNumber] = React.useState(1);
    const [updatedDevice, setUpdatedDevice] = useState([]);

    const points = [
        {
            latitude: 55.87718449372465,
            longitude: 9.843060997890376,
        }, {
            latitude: 55.86166292402054,
            longitude: 9.85732146270322,
        }, {
            latitude: 55.856956026565534,
            longitude: 9.874513581001828,
        }
    ];





    const getRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 3);
        setNumber(randomNumber);
    }
    let bikeOnMap = points[1];

    // const choosingABike = () => { }


    async function readingDatabase() {
        const firestore = getFirestore();
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
            console.log('uppd.', updatedDevice)
            return updatedDevice;

        } else {
            console.log('Something Weirds happened...')
        }



    };
    const [selectedDevice, setSelectedDevice] = useState(null);
    const deviceList = ["Device 1", "Device 2", "Device 3"]; // Example device list

    useEffect(() => {
        const fetchDeviceList = async () => {
            const devices = await readingDatabase();
            setDeviceList(devices);
        };

        fetchDeviceList();
    }, []);

    const handleDeviceChange = (device) => {
        setSelectedDevice(device);
    };






    useEffect(() => {

        const fetchUpdatedDevice = async () => {
            const devices = await readingDatabase();
            console.log('DDDD.', updatedDevice)
            setUpdatedDevice(devices);
        };

        fetchUpdatedDevice();
    }, []);

    // const deviceList = ["Device 1", "Device 2", "Device 3"]; // Example device list


    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                {/* <RNPickerSelect
                    onValueChange={handleDeviceChange}
                    items={deviceList.map((device) => ({
                        label: device,
                        value: device,
                    }))}
                    placeholder={{ label: 'Select a device', value: null }}
                    value={selectedDevice}
                /> */}

                <Text>THIS IS TOP BAR</Text>

            </View>
            <View style={styles.maps}>
                <View style={styles.containerMap}>

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 55.863426086619675,
                            longitude: 9.837198617457977,
                            latitudeDelta: 0.010,
                            longitudeDelta: 0.010,
                        }}
                    >

                        {/* <Marker
                            coordinate={{
                                latitude: 55.863426086619675,
                                longitude: 9.837198617457977,
                            }}
                        /> */}

                        <Marker
                            coordinate={{
                                latitude: 55.863426086619675,
                                longitude: 9.837198617457977,
                            }} image={imageSource}
                        />

                    </MapView>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {

        flex: 1,





    },
    topBar: {

        flex: 0.2,
        padding: 10,
        justifyContent: 'flex-end',
        backgroundColor: '#ffffff'


    },
    selectList: {
        bottom: -200, // Adjust the value as needed to control the dropdown list position
    },
    maps: {
        flex: 1,
        backgroundColor: 'pink'
    },
    containerMap: {
        ...StyleSheet.absoluteFillObject,
        // height: 200,
        // width: 400,
        // margin: 20,
        flex: 1,
        backgroundColor: 'blue',

        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bikeMarker: {

    },
    userMarker: {

    },
    dropdown: {
        height: 50,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        // zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

});


export default WhereIsBike;