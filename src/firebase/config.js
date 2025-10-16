import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase config from Firebase Console
// Go to: https://console.firebase.google.com/
// Project Settings > General > Your apps > Firebase SDK snippet > Config
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhly9EJqmRIqc4IL6CC5_LS80FvOi9xjI",
    authDomain: "redneck-feeds.firebaseapp.com",
    projectId: "redneck-feeds",
    storageBucket: "redneck-feeds.firebasestorage.app",
    messagingSenderId: "843093590847",
    appId: "1:843093590847:web:5f34688843ea13c415898a"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

