// Matchup between two teams
import React, {Component} from 'react';
import ScoreData from './scoreData';

class matchup extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);		
		this.updMatchup = this.updMatchup.bind(this);
		this.tableSelected = this.tableSelected.bind(this);
		var scoreA = this.initGames(null, props.numGames, "teamA");
		var scoreB = this.initGames(null, props.numGames, "teamB");

		this.state = {
			matchID: props.matchID,
			numGames : props.numGames,
			tableSelected: props.tableSelected,
			teamA: props.teamA,
			teamB: props.teamB,
			teamAScore: scoreA,
			teamBScore: scoreB,
			selectMatch: props.onSelect,
			numClicks: 0,
			adjustScore: props.adjustScore
		}
		// this.onClick = this.onClick.bind(this);
	}

	render() {			
		// console.log("Render Matchup: " + this.props.teamA + " vs " + this.props.teamB);
		var div_teamA = this.renderScoreData(this.state.teamA, this.state.teamAScore);
		var div_teamB = this.renderScoreData(this.state.teamB, this.state.teamBScore);
		var gameData = this.renderGameData();
		var selectState = (this.props.tableSelected == "true") ? 'table-selected' : 'table-deselected';

		return (
		<div>
			<div>
				<table className={'matchup ' + selectState} onClick={this.props.onSelect.bind(this, this.state.matchID)}>
				<tbody>
					{div_teamA}
					{div_teamB}
				</tbody>
				</table>
			</div>
		</div>
		);
	}

	renderScoreData(teamName, teamScore) {
		var updTeam = "";
		if (teamName == this.state.teamA) {
			updTeam = "teamA";
		} else if (teamName == this.state.teamB) {
			updTeam = "teamB";
		}
		teamScore = this.initGames(teamScore, this.props.numGames, updTeam);
		// Redo this with for loop to insert uniqueid?
		var scores = teamScore.map((team) => {
			var score = team.score;
			var index = team.index;
			var curTeam = team.team;
			var key = team.key;

			if (score=="unknown") {
				return <ScoreData score="unknown" key={key} index={index} team={curTeam} updMatchup={this.updMatchup}></ScoreData>;
			} else if (score == "loss") {
				return <ScoreData score="loss"  key={key} index={index} team={curTeam} updMatchup={this.updMatchup}></ScoreData>;
			} else if (score == "win") {
				return <ScoreData score="win"  key={key} index={index} team={curTeam} updMatchup={this.updMatchup}></ScoreData>;
			}
		});

		// console.log(scores);
		// return ( <td className='teamName' onClick={this.onClick}>{teamName}</td>{scores});		
		return (
			<tr className='matchup'>
			<td className='teamName matchup' onClick={this.props.incrementClick}>{teamName}</td>
			{scores}
			</tr>
			);
	}

	renderGameData() {
		return (
			<div>
				<p>Number of Clicks: {this.state.numClicks}</p>
				<p>Number of Games: {this.state.numGames}</p>
				<button onClick={this.adjustGames.bind(this, "subtract")}>Less Games</button>
				<button onClick={this.adjustGames.bind(this, "add")}>More Games</button>
			</div>
			);
	}

	tableSelected() {
		if (this.props.tableSelected == "false") {
			return this.setState({tableSelected: "true"});
		}
		return;
	}

	updMatchup(scoreIndex, scoreValue, team) {
		console.log("Updating ScoreIndex: " + scoreIndex + " with: " + scoreValue + " on Team: " + team);
		var oppositeValue = null;
		var itWasAWin = true;
		if (scoreValue == "unknown") { 
			oppositeValue = "unknown"; 
		} else {		
		 // oppositeValue = (scoreValue == "win") ? "loss" : "win";
		 	if (scoreValue == "win") {
		 		itWasAWin = true;
		 		oppositeValue = "loss";
		 	} else {
		 		oppositeValue = "win";
		 		itWasAWin = false;
		 	}
		}

		var scoreA = this.state.teamAScore;
		var scoreB = this.state.teamBScore;

		// set teamA and teamB 
		if (team == "teamA") {
			scoreA[scoreIndex].score = scoreValue;
			scoreB[scoreIndex].score = oppositeValue;
			if (scoreValue == "win")  this.state.adjustScore(this.state.teamA, 1);
			if (scoreValue == "unknown") this.state.adjustScore(this.state.teamA, -1);
			// if (scoreValue == "loss") {
			// 	this.state.adjustScore(this.state.teamA, -1);
			// 	this.state.adjustScore(this.state.team)
		} else if (team == "teamB") {
			scoreA[scoreIndex].score = oppositeValue;
			scoreB[scoreIndex].score = scoreValue;
			if (scoreValue == "win") this.state.adjustScore(this.state.teamB, 1);
			if (scoreValue == "unknown") this.state.adjustScore(this.state.teamB, -1);
		}

		// not treated as immutable, must fix!
		// https://medium.freecodecamp.org/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5
		this.setState({teamAScore: scoreA});
		this.setState({teamBScore: scoreB});

		// how to prevent double counting?
		var teamATotal = 0;
		var teamBTotal = 0;
		this.state.teamBScore.forEach((score) => {
			// console.log(score.score);
			teamBTotal += this.convertScoreToValue(score.score);
		});
		this.state.teamAScore.forEach((score) => {
			teamATotal += this.convertScoreToValue(score.score);
		});

		// this.state.adjustScore(teamA, wins)
		console.log("TeamB: " + teamBTotal);
		console.log("TeamA: " + teamATotal);

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

	convertScoreToValue(score) {
		if (score == "win") return 1;
		// if (score == "loss") return -1;

		return 0;
	}

	randomOutput(event) {
		// console.log(event);
	}

	onClick(event) {
		this.setState({numClicks: this.state.numClicks+1});
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