<!DOCTYPE html>
<html>
<style>
    
/* Full-width input fields */
input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

/* Set a style for all buttons */
button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

button:hover {
    opacity: 0.8;
}

/* Extra styles for the cancel button */
.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}

/* Center the image and position the close button */
.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
    position: relative;
}

img.avatar {
    width: 40%;
    border-radius: 50%;
}

.container {
    padding: 16px;
}

span.psw {
    float: right;
    padding-top: 16px;
}

/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
    position: absolute;
    right: 25px;
    top: 0;
    color: #000;
    font-size: 35px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: red;
    cursor: pointer;
}

/* Add Zoom Animation */
.animate {
    -webkit-animation: animatezoom 0.6s;
    animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
    from {-webkit-transform: scale(0)} 
    to {-webkit-transform: scale(1)}
}
    
@keyframes animatezoom {
    from {transform: scale(0)} 
    to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
       display: block;
       float: none;
    }
    .cancelbtn {
       width: 100%;
    }
}
</style>
<head>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase.js"></script>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
</head>
<body>

<h2>Modal Login Form</h2>

<button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Login</button>

<div id="id01" class="modal">
  
  <form class="modal-content animate" action="/action_page.php">
    <div class="imgcontainer">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
      <img src="img_avatar2.png" alt="Avatar" class="avatar">
    </div>

    <div class="container">
      <label><b>Username</b></label>
      <input id="email" type="text" placeholder="Enter Username" name="uname" required>

      <label><b>Password</b></label>
      <input id="password" type="password" placeholder="Enter Password" name="psw" required>
        
      <button id="login" type="submit">Login</button>
      <input type="checkbox" checked="checked"> Remember me
    </div>

    <div class="container" style="background-color:#f1f1f1">
      <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </form>
</div>

<script>
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    };
};

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB0UihSyhP1Vqa4Xty3BUdpogDcd3nBzNE",
    authDomain: "character-creator-3c5d4.firebaseapp.com",
    databaseURL: "https://character-creator-3c5d4.firebaseio.com",
    projectId: "character-creator-3c5d4",
    storageBucket: "character-creator-3c5d4.appspot.com",
    messagingSenderId: "786656588768"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

 // Button for signing up Email address and Password
$("#login").click(function(event){
    //If an event goes unhandled, its default action should not be taken as it normally would be
  event.preventDefault();
    // Grabs user input and stores them into variables
  var newEmail = $("#email").val().trim();
  var newPassword = $("#password").val().trim();

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

</script>

</body>
</html>
