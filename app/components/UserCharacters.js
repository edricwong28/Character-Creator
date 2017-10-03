import React, { Component } from "react";

let testCharacters = [
	{
		name:"",
		age:16,
		gender:"male"
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

	displayCharacter() {
		return (<div>Test</div>)
	}

	render() {
		return (
			<div>
				{this.state.characters.map(character => (
					<div>{this.displayCharacter()}</div>
				))}

			</div>
				
		);
	}
}


export default UserCharacters;