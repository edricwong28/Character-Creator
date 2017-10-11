import React, { Component } from "react";
const database = require("./firebase.js");

const ReservedProperties = ["comments","privacy","updatedAt","createdAt","userKey"];

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
		characterData: {},
		comment:""
	}

	componentDidMount() {
		this.loadCharacter();
	}

	loadCharacter() {
		database
			.ref(`allCharacters/${this.props.characterKey}`)
			.once('value')
			.then(char => 
		{

			if(char.val().privacy === "private") {
				return console.log("N/A");
			}
	    	console.log(char.val());
	    	this.setState({characterData:char.val()});
	    });
		// this.setState({characterData:testCharacter});
	}

	handleInputChange = event => {
	    const { name, value } = event.target;
	    this.setState({
	      [name]: value
		});
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
	            	<div className="characterPanel"> 
	            		{trait.name}: {trait.value} 
	            	</div>
	          	</div>
			))

		)
	}

	displayComments = comments => {

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

	uploadComment = event => {
		event.preventDefault();

		if(this.state.comment === "") {
			return
		}

		let newComment = {
			message: this.state.comment,
			userKey: this.props.userKey,
			createdAt: "testDate"
		}

		console.log(newComment);

		testCharacter.comments.push(newComment);

		this.setState({
			comment:""
		})
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
          				{this.props.userKey ? (
			              <form>
			              	<input className="form-control" name="comment" type="text" 
			                  onChange={this.handleInputChange}
			                  value={this.state.comment}/>

			                <button className="btn btn-primary" type="submit"  
              				  onClick={this.uploadComment}>Comment</button>
			              </form>
			              ) : (
			              <span></span>
			              )
			            }
          			</div>
				</div>		

			</div>				
		);
	}
}


export default UserCharacters;