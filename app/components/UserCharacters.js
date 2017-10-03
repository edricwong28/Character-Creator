import React, { Component } from "react";

const ReservedProperties = ["comments","_id"];

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
	}

];

class UserCharacters extends Component {

	state = {
		characters: []
	}

	componentDidMount() {
		this.loadCharacters();
	}

	loadCharacters() {
		this.setState({characters:testCharacters});
	}

	displayCharacter(character) {


		let traitsArr = [];

		for(let prop in character) {
			if(!ReservedProperties.includes(prop)) {
				traitsArr.push({name:prop,value:character[prop]});
			}
		}

		console.log(traitsArr);

		// let str = <div>Test</div>;

		// {traitsArr.map(trait => ( 
		// 	<div> {trait.name}: {trait.value} </div>
		// ))}

		// traitsArr.map(trait => ( 
		// 	<div className="characterPanel"> {trait.name}: {trait.value} </div>
		// ))

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
            				<h1 className="panel-title"> {character.name} </h1>
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