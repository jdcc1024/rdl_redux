// Matchup between two teams
import React, {Component} from 'react';
import ScoreData from './scoreData';

class matchup extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);		
		this.adjustScore = this.adjustScore.bind(this);
		var scoreA = this.initGames(null, props.numGames, "teamA");
		var scoreB = this.initGames(null, props.numGames, "teamB");
		// for (var i = 0; i < props.numGames; i++) {
		// 	scoreA.push(-1);
		// 	scoreB.push(0);
		// }

		this.state = {
			numGames : props.numGames,
			numClicks: 0,
			teamA: props.teamA,
			teamAScore: scoreA,
			teamB: props.teamB,
			teamBScore: scoreB
		}
		console.log("Helllooo");
		// this.onClick = this.onClick.bind(this);
	}

	renderScoreData(teamName, teamScore) {
		// Redo this with for loop to insert uniqueid?
		var scores = teamScore.map((team) => {
			var score = team.score;
			var index = team.index;
			var curTeam = team.team;
			var key = team.key;

			if (score=="unknown") {
				return <ScoreData score="unknown" key={key} index={index} team={curTeam} click={this.adjustScore}></ScoreData>;
			} else if (score == "loss") {
				return <ScoreData score="loss"  key={key} index={index} team={curTeam} click={this.adjustScore}></ScoreData>;
			} else if (score == "win") {
				return <ScoreData score="win"  key={key} index={index} team={curTeam} click={this.adjustScore}></ScoreData>;
			}
		});

		// console.log(scores);
		// return ( <td className='teamName' onClick={this.onClick}>{teamName}</td>{scores});		
		return (
			<tr>
			<td className='teamName' onClick={this.onClick}>{teamName}</td>
			{scores}
			</tr>
			);
	}

	render() {
		console.log("Triggerring Render!");
		var div_teamA = this.renderScoreData(this.state.teamA, this.state.teamAScore);
		var div_teamB = this.renderScoreData(this.state.teamB, this.state.teamBScore);
		return (
		<div>
			<div>
				<table>
				<tbody>
					{div_teamA}
					{div_teamB}
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


	adjustScore(scoreIndex, scoreValue, team) {
		console.log("Updating ScoreIndex: " + scoreIndex + " with: " + scoreValue + " on Team: " + team);
		var oppositeValue = (scoreValue == "win") ? "loss" : "win";
		var scoreA = this.state.teamAScore;
		var scoreB = this.state.teamBScore;
	
		if (team == "teamA") {
			scoreA[scoreIndex].score = scoreValue;
			scoreB[scoreIndex].score = oppositeValue;
		} else if (team == "teamB") {
			scoreA[scoreIndex].score = oppositeValue;
			scoreB[scoreIndex].score = scoreValue;
		}

		// not treated as immutable, must fix!
		// https://medium.freecodecamp.org/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5
		this.setState({teamAScore: scoreA});
		this.setState({teamBScore: scoreB});
	}

	adjustGames(action) {
		if (action == "subtract") {
			this.setState({numGames: --this.state.numGames});
		} else if (action == "add") {
			this.setState({numGames: ++this.state.numGames});
		}

		// editScores();	

		this.setState({teamAScore: this.initGames(this.state.teamAScore, this.state.numGames, "teamA")});
		this.setState({teamBScore: this.initGames(this.state.teamBScore, this.state.numGames, "teamB")});
	}	

	randomOutput(event) {
		console.log(event);
	}

	onClick(event) {
		this.setState({numClicks: this.state.numClicks+1});
		// console.log(event);
		// console.log("execute!");
	}

	initGames(scoreArray, numGames, curTeam) {		
		var newScore = [];	
		if (scoreArray == null || scoreArray.length == 0) {
			scoreArray = Array({score: "unknown", index: 0, key: 0, team: curTeam}); // init Array
		} 		
		// iterate through existing scores and add until we match numscores
		for (var i = 0; i < numGames; i++) {
			if (i >= scoreArray.length) {
				newScore.push({score: "unknown", index: i, key: i, team: curTeam});
			} else {
				newScore.push(scoreArray[i]);
			}
		}
		return newScore;
	}	

}


export default matchup;