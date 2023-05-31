import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
const imagePath = '../assets/logo.png';
const imageSource = require(imagePath);
const LoginOrReg = ({ navigation }) => {
    // Displays log in and registration button and navigates to said screen
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.container1}>
                    <View style={styles.circle} />
                    <View style={styles.container2}>
                        <View style={styles.titleView}>
                            <Image source={imageSource} />
                        </View>
                    </View>
                </View>
                <View style={styles.container3}>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.logAndSinUpBtnL} onPress={() => navigation.navigate('login')}>
                            <Text style={styles.buttonTextL}>LOG IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logAndSinUpBtnR} onPress={() =>
                            navigation.navigate('registration')}>
                            <Text style={styles.buttonTextR}>REGISTER</Text>
                        </TouchableOpacity>
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
    },
    container2: {
        flex: 1,
    },
    container3: {
        flex: 1,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'center',
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
        color: '#000000',
    },


});

export default LoginOrReg;