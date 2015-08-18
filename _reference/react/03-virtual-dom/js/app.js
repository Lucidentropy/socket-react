var initialBoxes = 3; 


var App = React.createClass({
	getInitialState: function(){
		return {numBoxes: initialBoxes};
	},

	render: function(){
		return(
			<div id="reactBoxAdder">
				<AddBoxButton addBox2={this.addBox1}/>
				<BoxDisplay numBoxes={this.state.numBoxes}/>
			</div>
		);
	},

	addBox1: function(){
		this.setState({numBoxes: (this.state.numBoxes + 1)});
	}
});

var AddBoxButton = React.createClass({
	render: function(){
		return(
			<button onClick={this.addBox3}>Add Box</button>
		);
	},

	addBox3: function(){
		this.props.addBox2();
	}
});

var BoxDisplay = React.createClass({
	render: function(){

		var boxes = [];
		for(var i = this.props.numBoxes; i > 0; i--){
			boxes.push(<Box boxNumber={i} key={i}/>);
		};

		return(
			<div className="reactBoxDisplay">
				{boxes}
			</div>
		);
	},
});

var Box = React.createClass({
	render: function(){
		return(
			<div className="box">
				<span className="title">Box</span>
				<span className="number">{this.props.boxNumber}</span>
			</div>
		);
	}
});

React.render(<App />, $('#react .content')[0]);