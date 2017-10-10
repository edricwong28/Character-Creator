const firebase = require('firebase');

// Initialize Firebase
const config = {
    apiKey: "AIzaSyB0UihSyhP1Vqa4Xty3BUdpogDcd3nBzNE",
    authDomain: "character-creator-3c5d4.firebaseapp.com",
    databaseURL: "https://character-creator-3c5d4.firebaseio.com",
    projectId: "character-creator-3c5d4",
    storageBucket: "character-creator-3c5d4.appspot.com",
    messagingSenderId: "786656588768"
};

firebase.initializeApp(config);

const database = firebase.database();

// database.ref().push({
// 	name:"Test",
// 	gender:"male",
// 	age:"23"
// });

// const now = Date.now();

// database.ref().set({
// 	users:{
// 		zero:{
// 			name:"name",
// 			email:"email",
// 			createdAt: now
// 		},

// 		one:{
// 			name:"name",
// 			email:"email",
// 			createdAt: now
// 		}
// 	},

// 	characters:{
// 		zero:{
// 			cero:{
// 				name:"name",
// 				gender:"gender",
// 				age:0,
// 				createdAt: now,
// 				updatedAt: now
// 			},

// 			uno:{
// 				name:"name",
// 				gender:"gender",
// 				age:0,
// 				createdAt: now,
// 				updatedAt: now
// 			}
// 		},

// 		one:{
// 			dos:{
// 				name:"name",
// 				gender:"gender",
// 				age:0,
// 				createdAt: now,
// 				updatedAt: now
// 			},

// 			tres:{
// 				name:"name",
// 				gender:"gender",
// 				age:0,
// 				createdAt: now,
// 				updatedAt: now
// 			}
// 		}
// 	}
// });

// database.ref("users").push({
// 	name:"YETC7",
// 	email:"tyler_726@live.com"
// });

// database.ref("characters/zero").push({
// 	name:"Test-2",
// 	gender:"male",
// 	age:"23",
// 	createdAt: now,
// 	updatedAt: now
// });

// database.ref("characters/zero/-KvsGfGEZa8kYNYV_f3K").update({
// 	name:"Test",
// 	gender:"female",
// 	age:23,
// 	species:"human",
// 	updatedAt: now
// });

// database.ref("characters/zero/-Kvs0PJ-16dZUbEzPscj").update({
// 	name:"Test",
// 	gender:"female",
// 	age:23,
// 	species:null
// });

// database.ref().once('value').then(snap => {
// 	console.log(snap.val());
// })

// database.ref('characters/zero')
//   .orderByChild('updatedAt')
//   .on('value', function(snapshot) { //or child_added
  
//   snapshot.forEach(function(child) {
//     console.log(child.val());
//   });
// });

database.ref("characters").on("child_changed",function(user) {
	// console.log(user.key);
	database.ref(`characters/${user.key}`).on("child_added",function(char) {
		let nextChar = char.val();
		nextChar.userKey = user.key;
		// console.log(nextChar);
		database.ref(`allCharacters/${char.key}`).update(nextChar);
	});

	// database.ref(`characters/${user.key}`).on("child_removed",function(char) {
	// 	// let deleteChar = char.val();
	// 	// nextChar.userKey = user.key;
	// 	// console.log(nextChar);

	// 	console.log(char.val);
	// 	database.ref(`allCharacters/${char.key}`).remove();
	// });
});

database.ref("characters").on("child_added",function(user) {
	// console.log(user.key);
	database.ref(`characters/${user.key}`).on("child_added",function(char) {
		let nextChar = char.val();
		nextChar.userKey = user.key;
		// console.log(nextChar);
		database.ref(`allCharacters/${char.key}`).update(nextChar);
	});
});

// database.ref("allCharacters").orderByChild("updatedAt")
// 	.on("child_added", function(snapshot) {
// 		console.log(snapshot.val());
// 	});

module.exports = database;