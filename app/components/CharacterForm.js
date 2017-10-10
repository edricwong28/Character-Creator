import React, { Component } from "react";
const database = require("./firebase.js");

const DefaultCharacteristics = ["name","age","gender"];
const ReservedProperties = ["comments","_id","isPublic"];

let testCharacter = 
  {
    name:"Test-2",
    age:16,
    gender:"male",
    species:"human",
    comments:[{
      message:"hello",
      userKey:0,
      createdAt:"testDate"
    },{
      message:"Yo",
      userKey:0,
      createdAt:"testDate"
    }]
  };

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
        && (!!stateObj[key] || stateObj[key] === '' || stateObj[key] === 0) ) 
      {
        if(stateObj[key]) {
          isEmpty = false;
        }
        output[key] = stateObj[key];
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
    let character = testCharacter;
    this.setState(character);
  };

  createForm = () => {
    let stateObj = this.state;
    let formComps = [];

    for (let key in stateObj) {
      if(key !== "newProperty" 
        && key !== "comments"
        && (!!stateObj[key] || stateObj[key] === '')
      ) {
        formComps.push({name:key,value:stateObj[key]});
      }
    }

    // console.log(formComps);


    return (
      formComps.map(characteristic => (
      <div key={characteristic.name} className="form-group">
          <label htmlFor={characteristic.name}>{characteristic.name}</label>
          <input className="form-control" name={characteristic.name} type="text" 
            onChange={this.handleInputChange}
            value={this.state[characteristic.name]}/>

          {!DefaultCharacteristics.includes(characteristic.name) ? (
              <button className="btn btn-primary"
                onClick={() => this.deleteProperty(characteristic.name)}
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