import React, { useState } from 'react';
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, } from 'react-native';
import { getAuth, updatePassword } from 'firebase/auth'
import { getFirestore, set, getDocs, ref, collection, updateDoc, doc } from 'firebase/firestore';



function UppdatingSettings({ navigation }) {
    const [psswrd, setPsswrd] = useState('');
    const [confirmPsswrd, setConfirmPsswrd] = useState('');
    const [device, setDevice] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;
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
            console.log('deviceArr:', deviceArr)
        } catch (error) {
            console.log('Error reading database:', error);
        }

        console.log('Device array:', deviceArr);



        const deviceNr = deviceArr[0];
        const updatedDevice = [];
        if (deviceNr) {


            for (let i = 0; i < Object.keys(deviceNr).length; i++) {
                if (deviceNr[`device${i}`] !== undefined) {
                    updatedDevice.push(deviceNr[`device${i}`]);
                }
            }
            console.log("UPDATED DEVIsES", updatedDevice)
            setDevice(updatedDevice);


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

            }


        } else {
            setDevice([]);

        }





    };

    const uppdatingPword = () => {



        if (psswrd === confirmPsswrd) {
            const auth = getAuth();
            const user = auth.currentUser;

            updatePassword(user, psswrd).then(() => {
                // Profile updated!
                alert('Password has been updated')
            }).catch((error) => {
                alert('An error accured when trying to update the password. Please try again.')
                console.log(error)
            });


        } else {
            alert('Passwords did not match')
        };



    };

    const uppdatingAccount = () => {

        console.log('BUTTON HAS BEEN PRESSED')



        // console.log('device: ', device,);
        // console.log('1st p', psswrd,);
        // console.log('2nd p', confirmPsswrd,);

        if (device.trim() === '' && psswrd.trim() !== '' && confirmPsswrd.trim() !== '') {

            console.log('run uppdating password')
            uppdatingPword();
            setPsswrd('');
            setConfirmPsswrd('');


        } else if (device.trim() !== '' && psswrd.trim() === '' && confirmPsswrd.trim() === '') {

            console.log('update devices')
            readingDatabase();
            setDevice('');

        } else if (device.trim() !== '' && psswrd !== '' && confirmPsswrd !== '') {

            console.log('uppdate both device and password')
            uppdatingPword();
            setDevice('');
            readingDatabase();
            setPsswrd('');
            setConfirmPsswrd('');



        } else {
            alert('Nothing to save')
        }

    };





    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} automaticallyAdjustKeyboardInsets>
                <View style={styles.circle} />
                <View style={styles.container}>


                    <View style={styles.container1}>
                        <View style={styles.circle} />
                        {/* <TouchableOpacity onPress={() => {
                            navigation.goBack();
                        }}>
                            <Text style={styles.goBack}> Go back </Text>
                        </TouchableOpacity> */}
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
                                // keyboardType="email-address"
                                value={device}
                                onChangeText={setDevice}
                            />
                            <Text style={styles.inputLable}> New Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="new password"
                                value={psswrd}
                                secureTextEntry={true}
                                onChangeText={setPsswrd}
                            />
                            <Text style={styles.inputLable}>Confirm Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="confirm password"
                                value={confirmPsswrd}
                                secureTextEntry={true}
                                onChangeText={setConfirmPsswrd}
                            />
                        </View>
                        <View style={styles.btnView}>

                            <TouchableOpacity style={styles.saveBtn} onPress={uppdatingAccount}>
                                <Text style={styles.btnText}>Save</Text>
                            </TouchableOpacity>
                        </View>


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
        // width: '100%',
        // height: 200,
        // color: '#ff0000',
        justifyContent: 'space-around',
        flex: 1,
        // backgroundColor: 'blue',
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
    },
    container3: {
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
        height: 730,
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
    titleText: {
        // flex: 1,
        left: 0,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 40,

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
    btnView: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green'

    },
    saveBtn: {
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
    btnText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#ffffff'
    }
});


export default UppdatingSettings;