import React, {Component} from 'react';

class ScoreData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			score: props.score,
			key: props.key,
			index: props.index,
			team: props.team,
			updMatchup: props.click
		};	
		this.onClick = this.onClick.bind(this);
	}

	render() {
		// console.log("Rendering a " + this.props.score + " score");
		this.state.score = this.props.score;
		if (this.props.score=="unknown") {
			return <td className='score score-unknown' onClick={this.onClick}></td>;
		} else if (this.props.score == "loss") {
			return <td className='score score-loss' onClick={this.onClick}></td>
		} else if (this.props.score == "win") {
			return <td className='score score-win' onClick={this.onClick}></td>
		}
		else { return <td className='score' onClick={this.onClick}></td>}
	}
	
	onClick() {
		if (this.state.score == "win") {
			this.state.updMatchup(this.state.index, "loss", this.state.team);
		} else {
			this.state.updMatchup(this.state.index, "win", this.state.team);
		}
	}
	
}

export default ScoreData;