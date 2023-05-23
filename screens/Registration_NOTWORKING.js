import React, { useRef } from 'react';
import { View, StyleSheet, Animated, Text, ScrollView } from 'react-native';
const RegistrationHandle = () => {


    return (
        <View style={styles.container}>
            <View style={styles.circle} />
            <View style={{ margin: 10, padding: 10 }} >
            </View>
            {/* Titleplacement */}
            < View style={styles.regTittlePlacment}>

                <Text style={styles.registrationText}>REGISTER</Text>

            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'pink' }}>
                <View>

                    <View style={styles.regBoxesContainer}>
                        <Text>SUP</Text>
                        <Text>HAAAAAOOO</Text>

                    </View>
                </View>
            </ScrollView>

        </View >


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'blue'
        // alignItems: 'center',
        // flexflow: 'column wrap',
        // alignContent: 'center',
        // justifyContent: 'center'
        // backgroundColor: 'black',
    },
    content: {
        // padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#ff0000'

    },
    whiteBackground: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    circle: {
        position: 'absolute',
        top: -375,
        right: -90,
        width: 900,
        height: 900,
        borderRadius: 750,
        backgroundColor: 'black',
        // transform: [{ rotate: '-20,96deg' }]
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
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
        fontSize: 40,

        // Fontfamily: 'Roboto',
        // lineHeight: 47,
        // align: 'left',
        // verticalAlign: 'top',
    },
    regBoxesContainer: {
        flex: 1,
        alignContent: 'flex-end',
        backgroundColor: '#6D9F71'

    }

});



export default RegistrationHandle;