import React, { Component } from "react";
const Moment = require('moment');
const database = require("./firebase.js");

const ReservedProperties = ["comments","privacy","updatedAt","createdAt","userKey"];

// let testCharacter = 
// 	{
// 		name:"Test-2",
// 		age:16,
// 		gender:"male",
// 		comments:[{
// 			message:"hello",
// 			user_id:0,
// 			createdAt:"testDate"
// 		},{
// 			message:"Yo",
// 			user_id:0,
// 			createdAt:"testDate"
// 		}]
// 	};

class UserCharacters extends Component {

	state = {
		characterData: {},
		comment:"",
		author:""
	}

	componentDidMount() {
		this.loadCharacter();
		this.loadAuthor();
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

	loadAuthor() {
		database
			.ref(`users/${this.props.userKey}`)
			.once('value')
			.then(user => 
		{
	    	console.log(user.val());
	    	this.setState({author:user.val()});
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
			if(!ReservedProperties.includes(prop) && prop !== "name") {
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

	displayComments = commentObj => {

		if (!commentObj) {return}

		// let char = this.state.characterData;

		let comments = [];

		for(let key in commentObj) {
			comments.push(commentObj[key]);
		}

		console.log(comments);

		return (
			
			comments.map(comment => (
				<div className="comment">
					<p className="commentBody text-left">{comment.message}</p>
					<p className="author">by {comment.userName} at {this.formatDate(comment.createdAt)}</p>
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
			userName: this.state.author.name,
			createdAt: Date.now()
		}

		console.log(newComment);

		// testCharacter.comments.push(newComment);

		database.ref(`characters/${this.state.characterData.userKey}/${this.props.characterKey}/comments`)
			.push(newComment);

		this.setState({
			comment:""
		})
	};

	formatDate(timestamp) {
		return Moment(timestamp).format("hh:mma MM/DD/YYYY");
	};

	render() {
		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-heading panel-heading-custom">
            			{this.state.characterData.name ? (
				              <h1 className="panel-title"> {this.state.characterData.name} </h1>
				        ) : (
				              <h1 className="panel-title"> Awaiting Name </h1>
				        )}
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