import React, { Components } from 'react';
import ReactDOM from 'react-dom';
// import Welcome from "./components/Welcome";
// import Main from "./components/Main";
// import Forum from "./components/Forum"

// const Routes = require('./config/routes');
import Routes from './config/routes';
console.log(Routes);
// debugger;
ReactDOM.render(
	<Routes />, 
	document.getElementById("app")
);