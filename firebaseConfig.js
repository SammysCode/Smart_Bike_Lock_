import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD-14Kl4qrgpXzSb839UZX9T4IAklC1hcY",
    authDomain: "smartbikelock-9983f.firebaseapp.com",
    projectId: "smartbikelock-9983f",
    storageBucket: "smartbikelock-9983f.appspot.com",
    messagingSenderId: "373845640368",
    appId: "1:373845640368:web:fd8b64d799b34ae4fbe775",
    measurementId: "G-X5J6R2D1JD"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export { app };
