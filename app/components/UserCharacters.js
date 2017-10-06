import React, { Component } from "react";

const ReservedProperties = ["comments","_id","isPublic"];

let testCharacters = [
	{
		name:"",
		age:16,
		gender:"male",
		comments:[]
	},

	{
		name:"test",
		age:16,
		gender:"male",
		testProp:""
	},

	{
	    name:"Test-2",
	    age:16,
	    gender:"male",
	    species:"human",
	    comments:[{
	      message:"hello",
	      user_id:0,
	      createdAt:"testDate"
	    },{
	      message:"Yo",
	      user_id:0,
	      createdAt:"testDate"
    }]
  }

];

let database = {
	users:{
		"AAAA":{
			name:"Red"
		},

		"AAAB":{
			name:"Blue"
		}
	},

	characters:{
		"AAAA":{
			"0000":{
				name:"Red",
				age:10,
				gender:"male"
			},
			"0001":{
				name:"Bulb",
				age:5,
				gender:"male"
			}
		},

		"AAAB":{
			"0000":{
				name:"Blue",
				age:10,
				gender:"female"
			}
		}
	}
}

class UserCharacters extends Component {

	state = {
		characters: []
	}

	componentDidMount() {
		if(this.props.userKey)
			this.loadUserCharacters();

		else {
			this.loadPublicCharacters();
		}
	}

	loadUserCharacters() {
		this.setState({characters:testCharacters});
	}

	loadPublicCharacters() {
		this.setState({characters:testCharacters});
		// this.setState({characters:database.characters.AAAA});
	}

	displayCharacter = character => {


		let traitsArr = [];

		for(let prop in character) {
			if(!ReservedProperties.includes(prop)) {
				traitsArr.push({name:prop,value:character[prop]});
			}
		}

		console.log(traitsArr);

		return (

		traitsArr.map(trait => ( 
			<div className="row">
            	<div className="characterPanel"> {trait.name}: {trait.value} </div>
          	</div>
		))

		)
	}

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