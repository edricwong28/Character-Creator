// Dependencies
import React, { Component } from "react";
const database = require("./firebase.js");

// Constants
const ReservedProperties = ["comments","privacy","updatedAt","createdAt","userKey"];

// Displays all user characters or all public characters
class UserCharacters extends Component {

	state = {
		characters: []
	};

	// Load user's characters if userKey or loads public characters
	componentDidMount() {
		if(this.props.userKey)
			this.loadUserCharacters();

		else {
			this.loadPublicCharacters();
		}
	};

	// Recieves User's characters from database
	loadUserCharacters = () => {

		let characters = [];

		// Gets characters from database
		database.ref(`characters/${this.props.userKey}`)
		  .orderByChild('updatedAt')
		  .once('value')
		  .then(function(snapshots) {
		  
		  // Adds each character to array
		  snapshots.forEach(function(char) {
		    characters.push(char.val());
		  });

		  // console.log(characters);
		  this.setState({characters:characters.reverse()});

		}.bind(this));

	};

	// Loads public characters from database
	loadPublicCharacters = () => {

		let characters = [];

		// Gets characters from database
		database.ref(`allCharacters`)
		  .orderByChild('updatedAt')
		  // .orderByChild('privacy')
		  // .equalTo("public")
		  .once('value')
		  .then(function(snapshots) {
		  
		  // Only displays chaaracter if public
		  snapshots.forEach(function(char) {
		  	if(char.val().privacy === "public") {
		    	characters.push(char.val());
		  	}
		  });

		  // console.log(characters);
		  this.setState({characters:characters.reverse()});

		}.bind(this));
	};


	// Displays the characters characteristic
	displayCharacter = character => {

		let charArr = [];

		// Creates a list of characteristic
		for(let prop in character) {
			if(!ReservedProperties.includes(prop) && prop !== "name") {
				charArr.push({name:prop,value:character[prop]});
			}
		}

		// console.log(charArr);

		// Maps the array of characteristic to display it to the page
		return (

			charArr.map(char => ( 
	            <div className="characteristic"> {char.name}: {char.value} </div>
			))

		)
	};

	// Renders the page
	render() {
		return (
			<div>

				{!this.state.characters.length ?(
					<p>No characters to display</p>
				):(<br></br>)}

				{this.state.characters.map(character => (
					<div className="panel panel-default">
						<div className="panel-heading panel-heading-custom">
            				

            				{character.name ? (
				              <h1 className="panel-title"> {character.name} </h1>
				              ) : (
				              <h1 className="panel-title"> Awaiting Name </h1>
				              )
				            }
          				</div>

          				<div className="panel-body">
          					{this.displayCharacter(character)}
          				</div>
					</div>

					
				))}

			</div>
				
		);
	}
}


export default UserCharacters;