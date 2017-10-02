const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(

	<div className = 'main-container'>

		<div className="pure-menu pure-menu-horizontal">
	    	<ul className="pure-menu-list">
		        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
        		<li className="pure-menu-item"><a href="#" className="pure-menu-link">Log out</a></li>
        		<li className="pure-menu-item"><a href="#" className="pure-menu-link">Management creator</a></li>
        	</ul>
		</div>

		<div className="pure-g">
			<div className="pure-u-3-5">
				<div className ="content-wrapper">
					<div className="content">
					 <h2 className="content-head is-center">
					  Welcome back user</h2>
						<div className="buttons">
							<a className="button-error pure-button" href="#">Create character</a>
							<br></br>
							<br></br>
							<a className="button-error pure-button" href="#">View other users characters</a>
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

	</div>, document.getElementById('app'))

module.exports = "app.js"
// document.write('this works');