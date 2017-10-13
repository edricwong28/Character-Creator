import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import CharacterForm from "./CharacterForm.js";
import UserCharacters from "./UserCharacters.js";
// import ShowCharacter from "./ShowCharacter.js";

const firebase = require('firebase');
const database = require("./firebase.js");

// firebase.auth().createUserWithEmailAndPassword("tyler_726@sbcglobal.net", "Testing").then(user => {
// 	database.ref(`users/${user.uid}`).set({
// 		key:user.uid,
// 		email:user.email,
// 		name:"placehoder",
// 		createdAt:Date.now()
// 	});
// });

firebase.auth().signInWithEmailAndPassword("tyler_726@sbcglobal.net", "Testing").catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// ...
}).then(user => {
	database.ref(`users/${user.uid}`).update({
		key:user.uid,
		email:user.email,
		name:user.email,
		lastSignedIn:Date.now()
	});
});

const logOutCurrentUser = () => {

	firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}).catch(function(error) {
		  // An error happened.
	});
}

// firebase.auth().signOut().then(function() {
// 	  // Sign-out successful.
// 	}).catch(function(error) {
// 	  // An error happened.
// });

// const CurrentUserCharacters = () => {
// 	if (window.user) {
// 		return <UserCharacters userKey={window.user}/>
// 	}
// 	// return <h1>{window.user}</h1>

// 	return <h1>Loading</h1>
// }


class Main extends Component {

	state = {
		// userKey:"KDDVKfL7VxbkKOjPNwxFg0pP9cd2",
		// characterKey:"-KwF2xFzAvVcDBBesku0"
	}

	componentWillMount() {
	    firebase.auth().onAuthStateChanged(function(user) {
		  	if (user) {
		    	// User is signed in.
		    	console.log(user.uid);
		    	// window.user = user.uid;
		    	this.setState({userKey:user.uid});
		  	} 

		 	else {
		    	// No user is signed in.
		    	console.log("no user");
		    	// window.user = null;
		    	this.setState({userKey:undefined});
		  	}
		}.bind(this));
  	};

  	// render() {
   //  	return (
   //  		<div>
	  //    		<CharacterForm userKey={this.state.userKey}/>
	  //    		<CharacterForm characterKey={this.state.characterKey} userKey={this.state.userKey}/>

	  //     		<UserCharacters userKey={this.state.userKey}/>
	  //     		<UserCharacters />

	  //     	</div>
	  //   );
  	// }

  	loadUserCharacters() {
  		let userKey = this.state.userKey;
  		return <UserCharacters userKey={userKey}/>
  	};

  	loadCharacterForm() {
  		let userKey = this.state.userKey;
  		return <CharacterForm userKey={userKey}/>
  	}

  	loadPublicCharacters() {
  		let userKey = this.state.userKey;
  		return <UserCharacters userKey={userKey} viewing="public"/>
  	}

  	render() {
    	return (
    		<Router>
	    		<div>
	    			<Link to="/">Home</Link>
	    			<button className="btn btn-primary"
                	onClick={() => logOutCurrentUser()}
                	> Log-out
              		</button>

		    		{this.state.userKey === undefined ?(
		    			<h1>Login Page</h1>
		    		):(
		    			
			    			<div>
					     		<Switch>
					     			<Route exact path="/" render={() => (
					     				<div>
						     				<Link to="/characters">Your Characters</Link>
						     				<Link to="/create">New Character</Link>
						     				<Link to="/public">Public Characters</Link>
					     				</div>
					     			)} />

					     			<Route exact path="/characters" render={this.loadUserCharacters.bind(this)} />

					     			<Route exact path="/create" render={this.loadCharacterForm.bind(this)} />

					     			<Route exact path="/public" render={this.loadPublicCharacters.bind(this)} />
					     		</Switch>
					      	</div>
				      	
		    		)}
	    		</div>
    		</Router>
	    );
  	}

  	// render() {
   //  	return (
   //  		<div>
   //  			<Router>
   //  				<Switch>
   //  					<Route exact path="/" component={UserCharacters} />
   //  					<Route exact path="/test" component={UserCharacters} />
   //  					<Route render={() => <h1>Page not found</h1>} />
   //  				</Switch>
   //  			</Router>
	  //     	</div>
	  //   );
  	// }
}

export default Main;
