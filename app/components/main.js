import React, { Components } from 'react';

class Main extends React.Component {
	render() {
		return(

		<div className = 'main-container'>

			<div className="pure-menu pure-menu-horizontal">
		    	<ul className="pure-menu-list">
			        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Home</a></li>
	        		<li class="pure-menu-item"><a href="#" class="pure-menu-link">Log Out</a></li>
	        		<li class="pure-menu-item" id="title">Management creator</li>
	        	</ul>
			</div>

			<div className="pure-g">
				<div className="pure-u-3-5">
					<div className ="content-wrapper">
						<div className="content">
						 <h2 className="content-head is-center">
						 <b> Welcome back user </b></h2>
							<div className="buttons">
								<a className="button-error pure-button" href="createCharacter.js">Create character</a>
								<br></br>
								<br></br>
								<a className="button-error pure-button" href="forum.js">View other users characters</a>
							</div>
						</div>
					</div>
				</div>
				<div className="pure-u-1-3">
					<div className="content-wrapper">
						<div className="content">
						 <h2>Creations</h2>
						</div>
					</div>
				</div>
			</div>

			<div className="footer">
				<footer>
					<p>Management Creator; ©Copyright Daniel G., Edric W., Eric C.</p>
				</footer>
			</div>

		</div>
		);
	}
}
module.exports = Main;
	

