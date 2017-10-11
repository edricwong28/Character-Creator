import React, { Component } from "react";
const database = require("./firebase.js");

const DefaultCharacteristics = ["name","age","gender"];
const ReservedProperties = ["comments","privacy","updatedAt","createdAt","userKey"];

// let testCharacter = 
//   {
//     name:"Test-2",
//     age:16,
//     gender:"male",
//     species:"human",
//     comments:[{
//       message:"hello",
//       userKey:0,
//       createdAt:"testDate"
//     },{
//       message:"Yo",
//       userKey:0,
//       createdAt:"testDate"
//     }]
//   };

class CharacterForm extends Component {
  state = {
    name:"",
    gender:"",
    age:"",
    newProperty:""
  };

  componentDidMount() {
    if(this.props.characterKey) {



      this.fillForm(this.props.characterKey);
    }
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCreation = event => {
    event.preventDefault();

    let stateObj = this.state;
    let output = {};

    let isEmpty = true;

    for(let key in stateObj) {
      if(key 
        && key !== "newProperty" 
        // && (!!stateObj[key] || stateObj[key] === '' || stateObj[key] === 0) ) 
        && stateObj[key] !== undefined
      ){

        if((stateObj[key] + "").trim() !== "") {
          isEmpty = false;
        }
        
        output[key] = (stateObj[key] + "").trim();
      }

      else if (stateObj[key] === undefined) {
        output[key] = null;
        isEmpty = false;
      }
    }

    if (isEmpty) {
      return
    }

    let currentTime = Date.now();

    output.createdAt = currentTime;
    output.updatedAt = currentTime;

    console.log(output);
    // console.log(this.props.userKey);

    database.ref(`characters/${this.props.userKey}`).push(output);

    let empty = {};

    for (let key in stateObj) {
      empty[key] = "";
    }

    this.setState(empty);
  };

  handleEdit = event => {
    event.preventDefault();

    let stateObj = this.state;
    let output = {};

    let isEmpty = true;

    for(let key in stateObj) {
      if(key 
        && key !== "newProperty" 
        && !ReservedProperties.includes(key)
        // && (!!stateObj[key] || stateObj[key] === '' || stateObj[key] === 0) ) 
        && stateObj[key] !== undefined
      ){
        if((stateObj[key] + "").trim() !== "") {
          isEmpty = false;
        }

        output[key] = (stateObj[key] + "").trim();
      }

      else if (stateObj[key] === undefined) {
        output[key] = null;
        isEmpty = false;
      }
    }

    if (isEmpty) {
      return
    }

    let currentTime = Date.now();

    output.updatedAt = currentTime;

    console.log(output);
    database.ref(`characters/${this.props.userKey}/${this.props.characterKey}`).update(output);
    database.ref(`allCharacters/${this.props.characterKey}`).update(output);
  }

  addProperty = event => {
    event.preventDefault();

    let newProp = this.state.newProperty;

    // console.log(this.isUniqueCharacteristic(newPropObj));

    if(this.isUniqueCharacteristic(newProp) && this.state.newProperty !== "") {

      this.setState({
        [newProp]:"",
        newProperty:""
      });

    }

    else {
      this.setState({
        newProperty:""
      });
    }

    // console.log(this.state);
  };

  deleteProperty = characteristic => {

    this.setState({
      [characteristic]:undefined
    })

  };

  isUniqueCharacteristic = characteristic => {

    if(ReservedProperties.includes(characteristic)) {
      console.log("This Property is Reserved");
      return false;
    }

    let stateObj = this.state;

    if(stateObj[characteristic]) {
      return false;
    }

    this.setState({
      [characteristic]:""
    });

    return true;
  };

  fillForm = key => {
    database.ref(`characters/${this.props.userKey}/${this.props.characterKey}`).once('value').then(char => {
      // console.log(char.val());
      this.setState(char.val());
    })
  };

  createForm = () => {
    let stateObj = this.state;
    let characteristics = [];

    for (let key in stateObj) {
      if(key !== "newProperty" 
        && !ReservedProperties.includes(key)
        // && (!!stateObj[key] || stateObj[key] === '')
        && stateObj[key] !== undefined
      ) {
        characteristics.push(key);
      }
    }

    // console.log(characteristics);


    return (
      characteristics.map(characteristic => (
      <div key={characteristic} className="form-group">
          <label htmlFor={characteristic}>{characteristic}</label>
          <input className="form-control" name={characteristic} type="text" 
            onChange={this.handleInputChange}
            value={this.state[characteristic]}/>

          {!DefaultCharacteristics.includes(characteristic) ? (
              <button className="btn btn-primary"
                onClick={() => this.deleteProperty(characteristic)}
                > Delete 
              </button>
            ):(
              <span></span>
            )
          }
      </div>
      ))
    )
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">

          <div className="panel-heading panel-heading-custom">
            {this.props.characterKey ? (
              <h1 className="panel-title"> Edit </h1>
              ) : (
              <h1 className="panel-title"> Create </h1>
              )
            }
          </div>

          <div className="panel-body">

            {this.createForm()}

            {this.props.characterKey ? (
              <button className="btn btn-primary"  
                onClick={this.handleEdit}>Edit</button>
              ) : (
              <button className="btn btn-primary"  
                onClick={this.handleCreation}>Create</button>
              )
            }

            <form>

              <div className="form-group">
                  <label htmlFor="newProperty">Property</label>
                  <input className="form-control" name="newProperty" type="text" 
                  onChange={this.handleInputChange}
                  value={this.state.newProperty}/>
              </div>

              <button className="btn btn-primary" type="submit"  
              onClick={this.addProperty}>Add Property</button>

            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default CharacterForm;