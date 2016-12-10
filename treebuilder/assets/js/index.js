var React = require('react')
var ReactDOM = require('react-dom')
var ReactRouter = require('react-router')
var browserHistory = ReactRouter.browserHistory;
//var Route = require('react-router').Route
//var Link = require('react-router').Link
var { Router,
      Route,
      IndexRoute,
      IndexLink,
      Link } = ReactRouter;

var App = React.createClass({
	render: function() {
		return (
			<div>
				<div className="page-header">
					<div className="content">
						<h1>Tree Builder</h1>
					</div>
				</div>
				<div className="content">
					<NavBar />
					{this.props.children}
				</div>
			</div>
		)
	}
});

var NavBar = React.createClass({
	render: function() {
		return (
			<nav className="navbar navbar-default navbar-mysite">
			<div className="container-fluid">
			<div className="navbar-header">
			  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			    <span className="sr-only">Toggle navigation</span>
			    <span className="icon-bar"></span>
			    <span className="icon-bar"></span>
			    <span className="icon-bar"></span>
			  </button>
			  <a className="navbar-brand" href="#">Logo</a>
			</div>

			<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			  <ul className="nav navbar-nav">
			    <li><Link to="/treebuilder/">Home<span className="sr-only">(current)</span></Link></li>
			    <li><Link to="/treebuilder/browse">Browse</Link></li>
			  </ul>
			  <form className="navbar-form navbar-left">
			    <div className="form-group">
			      <input type="text" className="form-control" placeholder="Search" />
			    </div>
			    <button type="submit" className="btn btn-default">Submit</button>
			  </form>
			  <ul className="nav navbar-nav navbar-right">
			    <li className="dropdown">
			      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account<span className="caret"></span></a>
			      <ul className="dropdown-menu">
			        <li><a href="#">Action</a></li>
			        <li><a href="#">Another action</a></li>
			        <li><a href="#">Something else here</a></li>
			        <li role="separator" className="divider"></li>
			        <li><a href="#">Logout</a></li>
			      </ul>
			    </li>
			    <li><Link to="/treebuilder/help">Help</Link></li>
			  </ul>
			</div>
			</div>
			</nav>
		)
	}
});

var Home = React.createClass({
	render: function() {
		return (
			<TreeViewer />
		);
	}
});

var Browse = React.createClass({
	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Browse</div>
				<div className="panel-body">
					<p>Truffaut vinyl hot chicken small batch farm-to-table kinfolk. VHS four loko yr, put a bird on it unicorn succulents mixtape meggings single-origin coffee austin hashtag fam street art. Freegan microdosing keffiyeh air plant lumbersexual. Stumptown celiac cred live-edge. Readymade chicharrones meggings beard, knausgaard pitchfork cliche hot chicken cornhole pork belly pickled fashion axe flannel coloring book. Cronut actually pok pok vexillologist, fashion axe church-key pickled pug fixie keffiyeh distillery kombucha. Narwhal schlitz bespoke tilde tofu, copper mug skateboard succulents actually messenger bag blue bottle roof party.</p>
				</div>
			</div>
		);
	}
});

var Help = React.createClass({
	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Help</div>
				<div className="panel-body">
					<p>Asymmetrical sustainable man bun, ramps freegan literally cred everyday carry slow-carb DIY vape knausgaard. Hella sartorial man bun pour-over, vaporware swag tumeric tattooed pitchfork etsy edison bulb. Fixie flexitarian messenger bag brooklyn, ugh readymade cliche iceland migas whatever franzen listicle. Pork belly kombucha swag, humblebrag edison bulb pug copper mug. Cardigan thundercats drinking vinegar, before they sold out sustainable hell of yuccie vice pour-over bespoke af. Sartorial cold-pressed kale chips la croix. Lyft ugh +1 polaroid, art party pok pok raw denim vegan.</p>
				</div>
			</div>
		);
	}
});

var TreeViewer = React.createClass({
	getInitialState: function() {
		return {
			personId: '1'
		};
	},
	updateProfile: function(id) {
		this.setState({
			personId: id
		});
	},
	render: function() {
		return (
			<div>
				<div className="left-container">
					<PersonTable updateProfile={this.updateProfile} />
				</div>
				<div className="right-container">
					<PersonProfile personId={this.state.personId} / >
				</div>
			</div>
		);
	}
});

var PersonTable = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function() {
		this.getDataFromServer('api/');
	},
	showResult: function(response) {
		this.setState({
			data: response
		});
	},
	getDataFromServer: function(URL) {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: URL,
			success: function(response) {
				this.showResult(response);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		var updateProfile = this.props.updateProfile;
		var person = this.state.data.map(function(person, index) {
			return <PersonTableItem key={index} person={person} updateProfile={updateProfile} />
		});
		return (
			<div className="panel panel-default">
				<div className="panel-heading">List of Names</div>
				<div className="panel-body">
					<p>Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
				</div>
				<div className="row">
				<div className="col-md-12">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Name</th>
								<th>Gender</th>
								<th>Date of Birth</th>
								<th>Date of Death</th>
							</tr>
						</thead>
						<tbody>
							{person}
						</tbody>
					</table>
				</div>
			</div>
			</div>
		);
	}
});

var PersonTableItem = React.createClass({
	loadProfile: function(){
		var id = this.props.person.id;
		this.props.updateProfile(id);
	},
	render: function() {
		var person = this.props.person;
		return (
			<tr onClick={this.loadProfile}>
				<td>{person.first_name} {person.last_name}</td>
				<td>{person.gender}</td>
				<td>{person.date_of_birth}</td>
				<td>{person.date_of_death}</td>
			</tr>
		);
	}
});

var PersonProfile = React.createClass({

	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function() {
		var id = this.props.personId;
		this.getDataFromServer('profile/api/' + id);
	},
	showResult: function(response) {
		this.setState({
			data: response
		});
	},
	getDataFromServer: function(URL) {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: URL,
			success: function(response) {
				this.showResult(response);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	componentWillReceiveProps: function(nextProps) {
		var id = nextProps.personId;
		this.getDataFromServer('profile/api/' + id);
	},
	loadProfile: function(id){
		this.getDataFromServer('profile/api/' + id);
	},
	render: function() {
		var person = this.state.data;
		
		return (
			<div className="panel panel-default">
				<div className="panel-heading">{person.full_name}</div>
				<div className="panel-body">
					<p>
					<b>First Name:</b> {person.first_name}<br />
					<b>Middle Name:</b> {person.middle_name}<br />
					<b>Last Name:</b> {person.last_name}<br />
					<b>Gender:</b> {person.gender}<br />
					<b>Date of Birth:</b> {person.date_of_birth}<br />
					<b>Date of Death:</b> {person.date_of_death}<br />
					<b>Age:</b> {person.age}<br />
					<b>Father:</b> <a href="#" onClick={this.loadProfile.bind(this, person.father)}>{person.father_name}</a><br />
					<b>Mother:</b> <a href="#" onClick={this.loadProfile.bind(this, person.mother)}>{person.mother_name}</a><br />
					</p>
				</div>
			</div>
		);
	}
})

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/TreeBuilder/" component={App}>
 		<IndexRoute component={Home} />
 		<Route path="browse" component={Browse} />
 		<Route path="help" component={Help} />
    </Route>
  </Router>,
  document.getElementById('container')
);

