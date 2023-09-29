// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEhoYaJ-gQB3LuompSud_mJBQE-6jKB8c",
    authDomain: "second-test-397fd.firebaseapp.com",
    projectId: "second-test-397fd",
    storageBucket: "second-test-397fd.appspot.com",
    messagingSenderId: "287585020228",
    appId: "1:287585020228:web:84459cfdffd6c7f3e00f11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;


