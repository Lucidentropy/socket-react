var initialBoxes = 3; 


var App = React.createClass({
	getInitialState: function(){
		return {numBoxes: initialBoxes};
	},

	render: function(){
		return(
			<div id="reactBoxAdder">
				<AddBoxButton addBox={this.addBox}/>
				<BoxDisplay numBoxes={this.state.numBoxes}/>
			</div>
		);
	},

	addBox: function(){
		this.setState({numBoxes: (this.state.numBoxes + 1)});
	}
});

var AddBoxButton = React.createClass({
	render: function(){
		return(
			<button onClick={this.addBox}>Add Box</button>
		);
	},

	addBox: function(){
		this.props.addBox();
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

React.render(<App side="left"/>, $('#react .left')[0]);
React.render(<App />, $('#react .right')[0]);