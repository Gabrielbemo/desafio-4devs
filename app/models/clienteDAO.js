var Firebase = require('firebase');

Firebase.initializeApp({
    databaseURL: "https://projeto-4logic.firebaseio.com",
    serviceAccount: './projeto-4logic-firebase-adminsdk-pw00g-b6023c2ddf.json'
});

var db = Firebase.database();

var usersRef = db.ref("clientes");

module.exports.usersRef = usersRef;
