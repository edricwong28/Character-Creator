import React from 'react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    
    // Get the modal
    const modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      };
    };

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyB0UihSyhP1Vqa4Xty3BUdpogDcd3nBzNE",
    authDomain: "character-creator-3c5d4.firebaseapp.com",
    databaseURL: "https://character-creator-3c5d4.firebaseio.com",
    projectId: "character-creator-3c5d4",
    storageBucket: "character-creator-3c5d4.appspot.com",
    messagingSenderId: "786656588768"
  };

  firebase.initializeApp(config);
  const database = firebase.database();

  // Button for signing up Email address and Password
  $("#login").click(function(event){
    //If an event goes unhandled, its default action should not be taken as it normally would be
  event.preventDefault();
    // Grabs user input and stores them into variables
  const newEmail = $("#email").val().trim();
  const newPassword = $("#password").val().trim();

  // Creates local "temporary" object for holding employee data

  newObject = {
    email: newEmail,
    password: newPassword
  };

    // Uploads employee data to the database, this will "trigger" the "child_added" event
    database.ref().push(newObject);

      // Logs everything to console
      console.log(newObject.email);
      console.log(newObject.password);

      alert("Successfully Signed Up!");

      // clears the input boxes
      $("#email").val("");
      $("#password").val("");

  });
      <h2>Modal Login Form</h2>

      <button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Login</button>

      <div id="id01" className="modal">
        
        <form className="modal-content animate" action="/action_page.php">
          <div className="imgcontainer">
            <span onclick="document.getElementById('id01').style.display='none'" className="close" title="Close Modal">&times;</span>
            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
          </div> 

          <div className="container">
            <label><b>Username</b></label>
            <input id="email" type="text" placeholder="Enter Username" name="uname" required />

            <label><b>Password</b></label>
            <input id="password" type="password" placeholder="Enter Password" name="psw" required />
              
            <button id="login" type="submit">Login</button>
            <input type="checkbox" checked="checked" />
          </div>

          <div className="container" style="background-color:#f1f1f1">
            <button type="button" onclick="document.getElementById('id01').style.display='none'" className="cancelbtn">Cancel</button>
            <span className="psw">Forgot <a href="#">password?</a></span>
          </div>
        </form>
      </div>
    );
  }
}
module.exports = Welcome; 


