import React, { Component } from "react";
const database = require("./firebase.js");


const ReservedProperties = ["comments","privacy","updatedAt","createdAt","userKey"];

// let testCharacters = [
// 	{
// 		name:"",
// 		age:16,
// 		gender:"male",
// 		comments:[]
// 	},

// 	{
// 		name:"test",
// 		age:16,
// 		gender:"male",
// 		testProp:""
// 	},

// 	{
// 	    name:"Test-2",
// 	    age:16,
// 	    gender:"male",
// 	    species:"human",
// 	    comments:[{
// 	      message:"hello",
// 	      user_id:0,
// 	      createdAt:"testDate"
// 	    },{
// 	      message:"Yo",
// 	      user_id:0,
// 	      createdAt:"testDate"
//     }]
//   }

// ];

class UserCharacters extends Component {

	state = {
		characters: []
	};

	componentDidMount() {
		if(this.props.userKey)
			this.loadUserCharacters();

		else {
			this.loadPublicCharacters();
		}
	};

	loadUserCharacters() {

		let characters = [];
		// this.setState({characters:testCharacters});
		database.ref(`characters/${this.props.userKey}`)
		  .orderByChild('updatedAt')
		  .once('value')
		  .then(function(snapshots) {
		  
		  snapshots.forEach(function(char) {
		    characters.push(char.val());
		  });

		  console.log(characters);
		  this.setState({characters:characters.reverse()});

		}.bind(this));

	};

	loadPublicCharacters() {

		let characters = [];
		// this.setState({characters:testCharacters});
		database.ref(`allCharacters`)
		  .orderByChild('updatedAt')
		  // .orderByChild('privacy')
		  // .equalTo("public")
		  .once('value')
		  .then(function(snapshots) {
		  
		  // console.log(snapshots);

		  snapshots.forEach(function(char) {
		  	if(char.val().privacy === "public") {
		    	characters.push(char.val());
		  	}
		  });

		  console.log(characters);
		  this.setState({characters:characters.reverse()});

		}.bind(this));
	};

	displayCharacter = character => {


		let traitsArr = [];

		for(let prop in character) {
			if(!ReservedProperties.includes(prop)) {
				traitsArr.push({name:prop,value:character[prop]});
			}
		}

		// console.log(traitsArr);

		return (

		traitsArr.map(trait => ( 
			<div className="row">
            	<div className="characterPanel"> {trait.name}: {trait.value} </div>
          	</div>
		))

		)
	};

	render() {
		return (
			<div>
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