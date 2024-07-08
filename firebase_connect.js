const firebase = require('firebase/app')
const firebaseConfig = {
    apiKey: "AIzaSyCmCFhsoi-uuNo0crcpXaxJtN-wXF4dlf8",
    authDomain: "tambola-ceab3.firebaseapp.com",
    databaseURL: "https://tambola-ceab3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tambola-ceab3",
    storageBucket: "tambola-ceab3.appspot.com",
    messagingSenderId: "432676461602",
    appId: "1:432676461602:web:b038586b26c33b4e2ebe7b",
    measurementId: "G-BEQF4Z6N8J"
};
const app=firebase.initializeApp(firebaseConfig);

module.exports=app;