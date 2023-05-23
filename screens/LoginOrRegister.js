import React from "react";
import { View, StyleSheet, Animated, Text, ScrollView, TextInput, Button, TouchableOpacity, Image } from 'react-native';
const imagePath = '../assets/logo.png';
const imageSource = require(imagePath);
const LoginOrReg = ({ navigation }) => {

    return (
        <View>

            <View style={styles.container}>



                <View style={styles.container1}>
                    <View style={styles.circle} />
                    <View style={styles.container2}>
                        <View style={styles.titleView}>
                            <Image source={imageSource} />
                            {/* <Text style={styles.titelText}>SMART BIKE LOCK</Text> */}
                        </View>
                    </View>

                </View>
                {/* <View style={styles.container2}>
                    <Text>This is text</Text>
                </View> */}
                <View style={styles.container3}>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.logAndSinUpBtnL} onPress={() => navigation.navigate('login')}>
                            <Text style={styles.buttonTextL}>LOG IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logAndSinUpBtnR} onPress={() =>
                            navigation.navigate('registration')}>
                            <Text style={styles.buttonTextR}>REGISTER</Text>
                        </TouchableOpacity>

                        {/* <Button color='black' title="Log In"
                        />
                        <Button color='black' width='80%' height='10%' title="Sing Up!"
                        /> */}
                    </View>
                </View>
            </View>
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
        flex: 3,
        marginTop: 10,
        padding: 10,
        justifyContent: 'space-around',
        display: 'flex',
        // backgroundColor: "blue"

    },
    container2: {
        flex: 1,
        // backgroundColor: "red",


    },
    container3: {
        flex: 1,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'center',
        // backgroundColor: "purple"

    },
    circle: {
        position: 'absolute',
        top: -480,
        right: -130,
        width: 1100,
        height: 1000,
        borderRadius: 750,
        backgroundColor: 'black',
    },
    titleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // bottom: '-10%',


    },
    titelText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 38,

    },
    buttonView: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        // backgroundColor: 'white',
        padding: 20,
        gap: 10,

    },
    logAndSinUpBtnR: {
        width: 166,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#000000',
    },
    buttonTextR: {
        fontSize: 13,
        fontWeight: '900',
        color: '#ffffff'

    },
    logAndSinUpBtnL: {
        width: 166,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#000000',
    },
    buttonTextL: {
        fontSize: 13,
        fontWeight: '900',
        color: '#000000'

    },


});

export default LoginOrReg;