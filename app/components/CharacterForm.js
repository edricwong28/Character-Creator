import React, { Component } from "react";

const DefaultCharacteristics = ["name","age","gender"];
const ReservedProperties = ["comments","_id"];

let testCharacter = 
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

  handleFormSubmit = event => {
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

    console.log(output);

    this.setState({
      newProperty:""
    });    
  };

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
                onClick={this.handleFormSubmit}>Edit</button>
              ) : (
              <button className="btn btn-primary"  
                onClick={this.handleFormSubmit}>Create</button>
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