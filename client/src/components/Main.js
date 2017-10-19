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

// firebase.auth().signInWithEmailAndPassword("tyler_726@sbcglobal.net", "Testing").catch(function(error) {
// 	// Handle Errors here.
// 	var errorCode = error.code;
// 	var errorMessage = error.message;
// 	// ...
// }).then(user => {
// 	database.ref(`users/${user.uid}`).update({
// 		key:user.uid,
// 		email:user.email,
// 		name:user.email,
// 		lastSignedIn:Date.now()
// 	});
// });

const logOutCurrentUser = () => {

	firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}).catch(function(error) {
		  // An error happened.
	}).then(function() {
		window.location.href = "/";
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
		userKey:undefined
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

  	registeringUser = event => {
		event.preventDefault();

		let name = (this.refs.regName.value + "").trim();
		let email = this.refs.regEmail.value;
		let password = this.refs.regPassword.value;

		if(!name) {
			this.setState({regError:"Username is required"});
			return;
		}

		let nameIsUnique = true;

		database.ref(`users`)
		.once('value')
		.then(function(snapshots) {
		  
		  // Adds each character to array
		  snapshots.forEach(function(user) {
		    if(user.val().name === name) {
		    	nameIsUnique = false;
		    }
		  });

		  if(nameIsUnique) {
		  	this.registerUser(name,email,password);
		  }

		  else {
		  	this.setState({regError:"Username is taken"});
		  }

		}.bind(this));
	};

	registerUser = (name,email,password) => {

		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			// var errorCode = error.code;
			var errorMessage = error.message;

			this.setState({regError:errorMessage});
			// ...
		}.bind(this)).then(user => {
			if(!user) {return}

			database.ref(`users/${user.uid}`).update({
				key:user.uid,
				email:user.email,
				name:name,
				createdAt:Date.now(),
				lastSignedIn:Date.now()
			});
		});	
	}

	logInUser = event => {
		event.preventDefault();

		let email = this.refs.loginEmail.value;
		let password = this.refs.loginPassword.value;

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			// var errorCode = error.code;
			var errorMessage = error.message;

			this.setState({loginError:errorMessage});
			// ...
		}.bind(this)).then(user => {
			if(!user) {return}

			database.ref(`users/${user.uid}`).update({
				lastSignedIn:Date.now()
			});
		});
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

  	logoutButton() {


  		if(this.state.userKey) {
  			return (
	            <li className="pure-menu-item"><p className="pure-menu-link"
	                onClick={() => logOutCurrentUser()}
	                > Log-out
	            </p></li>
	        )
  		}

  		return null;
  	}

  	displayError(err) {
  		if(err) {
  			return (<p>{err}</p>);
  		}

  		return null;
  	}

  	render() {
    	return (
    		<Router>
	    		<div>

	    			<div className="pure-menu pure-menu-horizontal">
				    	<ul className="pure-menu-list">
					        <li className="pure-menu-item"><Link className="pure-menu-link" to="/" >Home</Link></li>
					        {this.logoutButton()}
			        		<li className="pure-menu-item" id="title">Management creator</li>
			        	</ul>
					</div>

		    		{this.state.userKey === undefined ?(
		    			<div>

			    			<h1>Login</h1>

			    			<div>
				    			<form onSubmit={this.logInUser}>
				    				<div className="form-group">
				    					<label htmlFor="email">Email address</label>
				    					<input type="email" className="form-control" ref="loginEmail" />
				    				</div>

				    				<div className="form-group">
				    					<label htmlFor="password">Password</label>
				    					<input type="password" className="form-control" ref="loginPassword" />
				    				</div>

				    				<button type="submit" className="btn btn-primary">Login</button>

				    				{this.displayError(this.state.loginError)}
				    			</form>
			    			</div>

			    			<h1>Register</h1>

			    			<div>
				    			<form onSubmit={this.registeringUser}>

				    				<div className="form-group">
				    					<label htmlFor="name">Username</label>
				    					<input type="text" className="form-control" ref="regName" />
				    				</div>

				    				<div className="form-group">
				    					<label htmlFor="email">Email address</label>
				    					<input type="email" className="form-control" ref="regEmail" />
				    				</div>

				    				<div className="form-group">
				    					<label htmlFor="password">Password</label>
				    					<input type="password" className="form-control" ref="regPassword" />
				    				</div>

				    				<button type="submit" className="btn btn-primary">Register</button>

				    				{this.displayError(this.state.regError)}
				    			</form>
			    			</div>
			    		</div>
		    		):(
		    			
			    			<div>
					     		<Switch>
					     			<Route exact path="/" render={() => (
					     				<div className="pure-g">
											<div className="pure-u-4-5">
												<div className ="content-wrapper">
													<div className="content">
													 <h2 className="content-head is-center">
													 <b> Welcome back user </b></h2>
														<div className="buttons">
															<Link to="/characters" className="button-error pure-button">Your Characters</Link>
										     				<Link to="/create" className="button-error pure-button">New Character</Link>
										     				<Link to="/public" className="button-error pure-button">Public Characters</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
					     			)} />

					     			<Route exact path="/characters" render={this.loadUserCharacters.bind(this)} />

					     			<Route exact path="/create" render={this.loadCharacterForm.bind(this)} />

					     			<Route exact path="/public" render={this.loadPublicCharacters.bind(this)} />
					     		</Switch>
					      	</div>
				      	
		    		)}

		    		<div className="footer">
						<footer>
							<p id="footerMsg"> Management Creator; ©Copyright Daniel G., Edric W., Eric C.</p>
						</footer>
					</div>
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
