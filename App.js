import React, { createRef, useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartWithLogo from './screens/startWithLogo';
import RegistrationHandle from './screens/Registration';
import LoginOrReg from './screens/LoginOrRegister';
import LogInHandler from './screens/LogIn';
import Registration from './screens/Registration';
import PairDevice from './screens/PairDevice';
import LockAndUnlockHandler from './screens/LockAndUnlock';
import UppdatingSettings from "./screens/Settings";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WhereIsBike from "./screens/WhereIsBike";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from "expo-secure-store";


// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const getSavedUserCredentials = async () => {
//   try {
//     const email = await SecureStore.getItemAsync('email');
//     const password = await SecureStore.getItemAsync('password');
//     return { email, password };
//   } catch (error) {
//     console.log('Error retrieving user credentials:', error);
//     return null;
//   }
// };

// const SignedInUser = () => {
//   return (

//     <Tab.Navigator
//       initialRouteName={'LockAndUnlock'}
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           let rn = route.name;

//           if (rn === 'Lock & Unlock') {
//             iconName = 'lock';
//           } else if (rn === 'Pair Device') {
//             iconName = 'exchange';
//           } else if (rn === 'Settings') {
//             iconName = 'cog';
//           } else if (rn === 'Map') {
//             iconName = 'map';
//           }
//           return <FontAwesome name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'black',
//         tabBarInactiveTintColor: 'grey',
//         tabBarLabelStyle: { paddingBottom: 5, fontSize: 10, height: 10 },
//         tabBarStyle: {
//           display: 'flex',
//         },
//       })}

//     // 
//     >
//       <Tab.Screen name="Pair Device" component={PairDevice} options={{ headerShown: false }} />
//       <Tab.Screen name="Lock & Unlock" component={LockAndUnlockHandler} options={{ headerShown: false }} />
//       <Tab.Screen name="Map" component={WhereIsBike} options={{ headerShown: false }} />

//       <Tab.Screen name="Settings" component={UppdatingSettings} options={{ headerShown: false }} />
//     </Tab.Navigator>
//   );
// }

export default function App() {
  return (<NavigationContainer>
    <WhereIsBike></WhereIsBike>
  </NavigationContainer>)
  // const [user, setUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const auth = getAuth();
  //   const checkSavedCredentials = async () => {
  //     const savedCredentials = await getSavedUserCredentials();
  //     if (savedCredentials) {
  //       navigateToNextScreen();
  //       const { email, password } = savedCredentials;
  //       signInWithEmailAndPassword(auth, email, password)
  //         .then((userCredential) => {
  //           const user = userCredential.user;
  //           console.log("Logged in with saved credentials:", user.email);
  //           // Navigate to the next screen after 2 seconds
  //         })
  //       // .catch((error) => {

  //       //   console.log('Error logging in with saved credentials:', error);
  //       //   setIsLoading(false); // Failed to log in, stop loading
  //       // });
  //     } else {
  //       setUser(null); // No saved credentials found, set the user to null
  //       setIsLoading(false); // No need to wait, stop loading
  //     }
  //   };

  //   checkSavedCredentials();



  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   // console.log(au)

  //   return () => unsubscribe();
  // }, []);

  // const navigateToNextScreen = () => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // };

  // if (isLoading) {
  //   return <StartWithLogo />;
  // }


  // return (
  //   <NavigationContainer>
  //     {user ? (

  //       <SignedInUser />
  //     ) : (
  //       <Stack.Navigator>
  //         <Stack.Screen name="loginOrRegister" component={LoginOrReg} options={{ headerShown: false }} />
  //         <Stack.Screen name="registration" component={Registration} options={{ headerShown: false }} />
  //         <Stack.Screen name="login" component={LogInHandler} options={{ headerShown: false }} />
  //       </Stack.Navigator>
  //     )}

  //     {/* <UppdatingSettings>

  //     </UppdatingSettings> */}
  //   </NavigationContainer>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  regTitleBox: {
    flex: 1,
    backgroundColor: '#FF4433',
    justifyContent: 'flex-start'
  }

});


{/* <View style={styles.container}>
        <Testing />
        <View style={styles.regTitleBox}>
          <Text style={color = '#252525'}>Is this working?</Text>
          <Text style={color = '#252525'}>Is this working?</Text>
          <Text style={color = '#252525'}>Is this working?</Text>
          <Text style={color = '#252525'}>Is this working?</Text>

        </View>
        <StatusBar style="auto" />
      </View> */}