import { initializeApp } from "firebase/app";
import  {initializeAuth, getReactNativePersistence} from "@firebase/auth";
import {getDatabase} from "firebase/database"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAh8wxpJDWAtQe51bg9_CQNAEDG-BEwmMw",
    authDomain: "mi-mor-c0916.firebaseapp.com",
    projectId: "mi-mor-c0916",
    storageBucket: "mi-mor-c0916.appspot.com",
    messagingSenderId: "833356599057",
    appId: "1:833356599057:web:83c801c1804cca188686b0",
    databaseURL: "https://mi-mor-c0916-default-rtdb.firebaseio.com/"
};
const app = initializeApp(firebaseConfig);
export const auth  =  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const dbRealTime = getDatabase(app);
