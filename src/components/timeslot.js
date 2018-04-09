import React, {Component} from 'react';
import Matchup from './matchup';
 // export default 
 class timeslot extends Component {

	constructor(props) {
		// console.log("Init timeslot!");
		super(props);
		var permutations = [
			{id: 0, home: 0, away: 1},
			{id: 1, home: 2, away: 3},
			{id: 2, home: 0, away: 2},
			{id: 3, home: 1, away: 3},
			{id: 4, home: 0, away: 3},
			{id: 5, home: 1, away: 2}
		];

		this.state = {
			week: this.props.week,
			gym: this.props.gym,
			timeslot: this.props.timeslot,
			numGames: this.props.numGames,
			selectedMatch: null,
			teams: this.props.teams,
			teamScore: [],
			permutations: permutations,
			numClicks: 0,			
		};

		this.initTeamScore = this.initTeamScore.bind(this);
		this.incrementClick = this.incrementClick.bind(this);
		this.calculateScores = this.calculateScores.bind(this);
		this.onSelectedMatch = this.onSelectedMatch.bind(this);
		this.adjustScore = this.adjustScore.bind(this);
	}

	componentDidMount() {
		this.initTeamScore();
	}

	render() {
		// console.log("Render Timeline");
		var teams = this.props.teams;

		var gameOptions = this.renderGameData();	
		var matchups = this.state.permutations.map((match) => {
			var curMatch = "false";
			if (this.state.selectedMatch == match.id) {
				curMatch = "true";
			}
			return <Matchup numGames={this.state.numGames} teamA={teams[match.home]} teamB={teams[match.away]} key={match.id} matchID={match.id} tableSelected={curMatch} incrementClick={this.incrementClick} onSelect={this.onSelectedMatch.bind(this)} adjustScore={this.adjustScore}></Matchup>
		});	

		// how to prevent player from accidentally changing score of other matchup?		
		return (
			<div>
				<div>
					{matchups}		
				</div>
				<div>
					{gameOptions}
				</div>
			</div>
		);
	}

	renderGameData() {
		return (
		<div>
			<table>
				<tbody>
				<tr>
					<td>
						<div>
							<button className='score-btn' onClick={this.calculateScores}>Show Scores</button>
						</div>
					</td>
					<td>
					<p>Number of Clicks: {this.state.numClicks}</p>
					<p>Number of Games: {this.state.numGames}</p>
					<button onClick={this.adjustGames.bind(this, "subtract")}>Less Games</button>
					<button onClick={this.adjustGames.bind(this, "add")}>More Games</button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
		);
	}

	initTeamScore() {
		var teamData = [];
		var timeslotTeams = this.state.teams;

		teamData = timeslotTeams.map((team) => {
			return {team: team, wins: 0, losses: 0, spirit: 0, favourite: ""};
		});

		this.setState({teamScore: teamData});
	}

	calculateScores() {
		this.state.teamScore.forEach((team) => {
			console.log(team.team + " has " + team.wins + " wins and " + team.spirit + " spirit points")
		});
	}

	adjustScore(team, adjustment) {
		// var ts = this.state.teamScore;
		var ts = this.state.teamScore.map((curTeam) => {
			if (team == curTeam.team) {
				// console.log("Adjusting Score for " + team + " by " + adjustment);
				var newWins = curTeam.wins + adjustment;
				return {team: curTeam.team, wins: newWins, losses: curTeam.losses, spirit: curTeam.spirit, favourite: curTeam.favourite};
				// this.setState({team[curTeam].wins: })
			}
			return curTeam;
		})
		this.setState({teamScore: ts});
		// console.log(ts);
	}

	onSelectedMatch(id) {
		this.setState({selectedMatch: id});
	}

	incrementClick() {
		this.setState({numClicks: ++this.state.numClicks});
	}
	
	adjustGames(action) {
		if (action == "subtract") {
			this.setState({numGames: --this.state.numGames});
		} else if (action == "add") {
			this.setState({numGames: ++this.state.numGames});
		}
	}

}

export default timeslot;