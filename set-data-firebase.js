const firebase=require("./firebase_connect");
const fs=require('fs');


exports.set_data_firebase=function(rand,i){

    firebase.database().ref("user/"+(i+1)).set({
        randomNo:rand
    })

}


