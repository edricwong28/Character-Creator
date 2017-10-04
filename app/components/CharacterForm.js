import React, { Component } from "react";

const DefaultCharacteristics = ["name","age","gender"];
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

class CharacterForm extends Component {
  state = {
    name:"",
    gender:"",
    age:"",
    // characteristics:[{name:"name"},{name:"gender"},{name:"age"}],
    defaultChars: DefaultCharacteristics,
    characteristics:[],
    newProperty:""
  };

  // componentDidMount() {
  //   for (let i = 0; i < DefaultCharacteristics.length; i ++)
  //     this.setState({
  //       [DefaultCharacteristics[i]]:""
  //     });
  // }

  componentDidMount() {
    if(this.props.characterKey) {

      

      this.fillForm(this.props.characterKey);
    }
  }

  // state = {
  //   characteristics:[
  //     {'name':""},
  //     {'gender':""},
  //     {'age':""}
  //   ]
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    // console.log(this.state);
  };

  handleFormSubmit = event => {
    event.preventDefault();

    let stateObj = this.state;
    let output = {};

    let isEmpty = true;

    for(let key in stateObj) {
      if(key && key !== "characteristics" && key !== "newProperty" && key !== "defaultChars") {
        if(stateObj[key]) {
          isEmpty = false;
        }
        output[key] = stateObj[key];
      }
    }

    if (!isEmpty) {
      console.log(output);
    }

    this.setState({
      name:"",
      gender:"",
      age:"",
      newProperty:""
    });    
  };

  addProperty = event => {
    event.preventDefault();

    let charArr = this.state.characteristics;
    let newProp = this.state.newProperty;

    // console.log(this.isUniqueCharacteristic(newPropObj));

    if(this.isUniqueCharacteristic(newProp) && this.state.newProperty !== "") {

      charArr.push(newProp);

      this.setState({
        characteristics: charArr,
        [newProp]:"",
        newProperty:""
      });

    }

    else {
      this.setState({
        newProperty:""
      });
    }

    console.log(this.state);
  };

  deleteProperty = characteristic => {

    console.log(characteristic);

    let charArr = this.state.characteristics;

    // // for (let i = 0; i<charArr; i++) {
    // //   if (charArr[i] === characteristic) {
    // //     charArr.splice(i,1);
    // //     return;
    // //   }
    // // }

    charArr.splice(charArr.indexOf(characteristic),1);

    this.setState({
      characteristics:charArr
    });
  };

  isUniqueCharacteristic = characteristic => {
    let defChars = this.state.defaultChars
    let charArr = this.state.characteristics;

    // for (let i = 0; i<charArr.length; i++) {
    //   if (characteristic === charArr[i]) {
    //     return false;
    //   }
    // }

    if(defChars.includes(characteristic) || charArr.includes(characteristic)) {
      return false;
    }

    if(ReservedProperties.includes(characteristic)) {
      console.log("This Property is Reserved");
      return false;
    }

    return true;
  };

  // getPropertyValue = characteristic => {
  //   let state = this.state;
  //   let defChars = this.state.defaultChars
  //   let charArr = this.state.characteristics;

  //   let str = `${characteristic}:`;
  // }

  fillForm = key => {
    let character = testCharacter;
    this.setState(character);
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading panel-heading-custom">
            <h1 className="panel-title"> Search </h1>
          </div>

          <div className="panel-body">

              {this.state.defaultChars.map(characteristic => (
                <div key={characteristic} className="form-group">
                  <label htmlFor={characteristic}>{characteristic}</label>
                  <input className="form-control" name={characteristic} type="text" 
                  onChange={this.handleInputChange}
                  value={this.state[characteristic]}/>
                </div>
              ))}

              {this.state.characteristics.map(characteristic => (
                <div key={characteristic} className="form-group">
                  <label htmlFor={characteristic}>{characteristic}</label>
                  <input className="form-control" name={characteristic} type="text" 
                  onChange={this.handleInputChange}
                  value={this.state[characteristic]}/>

                  <button className="btn btn-primary"
                  onClick={() => this.deleteProperty(characteristic)}
                  > Delete 
                  </button>
                </div>
              ))}

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