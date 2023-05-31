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

// Creates stacks for navigation + navigation bar
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Gets user credentials from device
const getSavedUserCredentials = async () => {
  try {
    const email = await SecureStore.getItemAsync('email');
    const password = await SecureStore.getItemAsync('password');
    // If there is credentrials saved it will return something 
    if (email !== null && password !== null) {
      return { email, password };
      // if no credentials it will return null 
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error retrieving user credentials:', error);
    return null;
  }
};
// If the user is signed in it will see different screens
const SignedInUser = () => {
  return (
    // This is the bottom navigatorbar 
    <Tab.Navigator
      initialRouteName={'LockAndUnlock'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === 'Lock & Unlock') {
            iconName = 'lock';
          } else if (rn === 'Pair Device') {
            iconName = 'exchange';
          } else if (rn === 'Settings') {
            iconName = 'cog';
          } else if (rn === 'Map') {
            iconName = 'map';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: { paddingBottom: 5, fontSize: 10, },
        tabBarStyle: {
          display: 'flex',
        },
      })}

    // 
    >
      {/* and the screens it will navigate to */}
      <Tab.Screen name="Lock & Unlock" component={LockAndUnlockHandler} options={{ headerShown: false }} />
      <Tab.Screen name="Map" component={WhereIsBike} options={{ headerShown: false }} />
      <Tab.Screen name="Pair Device" component={PairDevice} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={UppdatingSettings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gets current user (null= no user)
    const auth = getAuth();
    // Automatically checks if there are credentials on the device 
    const checkSavedCredentials = async () => {
      const savedCredentials = await getSavedUserCredentials();
      // If there are credentials saved on the device they will be automatically signed in with saved credentials 
      // and  navigated to the lock and unlock screen
      if (savedCredentials) {
        navigateToNextScreen();
        const { email, password } = savedCredentials;
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in with saved credentials:", user.email);
          })
        // If no credentrials are found 
      } else {
        setUser(null);
        navigateToNextScreen();
      }
    };

    checkSavedCredentials();

    // Changes the state of the user 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  // The start screen loads for 5 seconds and thenchanges the state of isLoading to false to continue to next screen
  const navigateToNextScreen = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  // For the start screen to load
  if (isLoading) {
    return <StartWithLogo />;
  }

  // Shows the correct screens if the user is signed in or not
  return (
    <NavigationContainer>
      {user ? (

        <SignedInUser />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="loginOrRegister" component={LoginOrReg} options={{ headerShown: false }} />
          <Stack.Screen name="registration" component={Registration} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={LogInHandler} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}

    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   regTitleBox: {
//     flex: 1,
//     backgroundColor: '#FF4433',
//     justifyContent: 'flex-start'
//   }

// });
