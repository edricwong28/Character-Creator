import React, { Component } from "react";

const ReservedProperties = ["comments","_id"];

let testCharacter = 
	{
		name:"Test-2",
		age:16,
		gender:"male",
		comments:[{
			message:"hello",
			user_id:0,
			createdAt:"testDate"
		},{
			message:"Yo",
			user_id:0,
			createdAt:"testDate"
		}]
	};

class UserCharacters extends Component {

	state = {
		characterData: {}
	}

	componentDidMount() {
		this.loadCharacter();
	}

	loadCharacter() {
		this.setState({characterData:testCharacter});
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
	            	<div className="characterPanel"> 
	            		{trait.name}: {trait.value} 
	            	</div>
	          	</div>
			))

		)
	}

	displayComments(comments) {

		if (!comments) {return}

		return (
			
			comments.map(comment => (
				<div className="comment">
					<p className="commentBody text-left">{comment.message}</p>
					<p className="author">by {comment.user_id} at <span className="dateString">{comment.createdAt}</span></p>
				</div>
			))
			
		)
	}

	render() {
		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-heading panel-heading-custom">
            			<h1 className="panel-title"> {this.state.characterData.name} </h1>
          			</div>

          			<div className="panel-body">
          				{this.displayCharacter(this.state.characterData)}
          				{this.displayComments(this.state.characterData.comments)}
          			</div>
				</div>		

			</div>				
		);
	}
}


export default UserCharacters;