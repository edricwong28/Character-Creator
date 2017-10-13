import React from 'react';
// import router from 'react-router';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Welcome from '../components/Welcome';
import Main from '../components/Main';
import Forum from '../components/Forum';

// const Route = router.Route;
// debugger;
console.log(Main);
const routes = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Main} />
			
			<Route path="/Welcome" component={Welcome} />

			<Route path="/Forum" component={Forum} />
		</Switch>
	</Router>
);

export default routes;