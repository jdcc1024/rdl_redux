// Matchup between two teams
import React, {Component} from 'react';
import ScoreEntry from './scoreEntry';

class matchup extends Component {
	constructor(props) {
		super(props);
		var scoreA = [];
		var scoreB = [];
		for (var i = 0; i < props.numGames; i++) {
			scoreA.push(-1);
			scoreB.push(0);
		}

		this.state = {
			numGames : props.numGames,
			numClicks: 0,
			teamA: "Eva's Emus",
			teamAScore: scoreA,
			teamB: "Horace's Horses",
			teamBScore: scoreB
		}

		console.log("Helllooo");
		this.onClick = this.onClick.bind(this);
	}

	render() {
		return (
		<div>
			<div>
				<table>
				<tbody>
					<ScoreEntry teamName={this.state.teamA} teamScore={this.state.teamAScore}></ScoreEntry>
					<ScoreEntry teamName={this.state.teamB} teamScore={this.state.teamBScore}></ScoreEntry>
				</tbody>
				</table>
			</div>

			<div>
				<p>Number of Clicks: {this.state.numClicks}</p>
				<p>Number of Games: {this.state.numGames}</p>
				<button onClick={this.adjustGames.bind(this, "subtract")}>Less Games</button>
				<button onClick={this.adjustGames.bind(this, "add")}>More Games</button>
			</div>
		</div>
		);
	}

	adjustGames(action) {
		if (action == "subtract") {
			this.setState({numGames: --this.state.numGames});
		} else if (action == "add") {
			this.setState({numGames: ++this.state.numGames});
		}
	}

	onClick() {
		this.setState({numClicks: this.state.numClicks+1});
		// console.log(this.state.teamAScore);
	}
}

export default matchup;