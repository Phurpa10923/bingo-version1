import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {getDatabase,ref,update,onValue,set} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAnalytics, } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {getAuth,signInWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
const firebaseConfig = {
apiKey: "AIzaSyCmCFhsoi-uuNo0crcpXaxJtN-wXF4dlf8",
authDomain: "tambola-ceab3.firebaseapp.com",
databaseURL:
    "https://tambola-ceab3-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "tambola-ceab3",
storageBucket: "tambola-ceab3.appspot.com",
messagingSenderId: "432676461602",
appId: "1:432676461602:web:b038586b26c33b4e2ebe7b",
measurementId: "G-BEQF4Z6N8J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database =getDatabase(app);
window.database=database;
window.ref = ref;
window.onValue=onValue;
window.set=set;
window.getAuth=getAuth;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.singOut = signOut;

export {database,ref,onValue,update,set,getAuth,signInWithEmailAndPassword,signOut};