import React, {Component} from 'react';
import axios from 'axios';
import Gym from './gym'

 // export default 
 class scheduler extends Component {

	constructor(props) {
		super(props);
		this.state = {
			history: {},
			gyms: ["Garden City"],
			teams: [],
			unscheduledTeams: []			
		};

	this.setUnscheduled = this.setUnscheduled.bind(this);
	this.setScheduled 	= this.setScheduled.bind(this);
	this.renderGyms 	= this.renderGyms.bind(this);
	this.renderTeams 	= this.renderTeams.bind(this);
	}

	componentDidMount() {
		// pull play history
		axios.get('..\\src\\static\\teamdata.json').then(result => {
			var json = result.data;
			this.setState({history: json});
			
			var teams = [];
			json.forEach((team) => {
				teams.push({
					name: team.team,
					encounters: team.opponents,
					gym: "none",
					timeslot: 0,
					side: "none"
				})
			});
			this.setState({teams: teams});

		});		
	}

	render() {
		console.log("Hello World");
		var historyStr = JSON.stringify(this.state.history);
		console.log(historyStr);

		var schedule = this.renderTeams();
		return (
			<div>
				<div>
					{schedule}
				</div>
				<div>
				</div>
			</div>
		);
	}

	setUnscheduled(team) {

	}

	setScheduled(teamName, gym, timeslot, side) {
		var teamData = [];

		 this.state.teams.forEach((team) => {		 	
		 	if (team.name == teamName) {
		 		var updTeam = {
		 			name: teamName,
					encounters: team.encounters,
					gym: gym,
					timeslot: timeslot,
					side: side
		 		};
		 		teamData.push(updTeam);
		 	} else {
		 		teamData.push(team);
		 	}		 	
		 });

		 this.setState({teams: teamData});
	}

	renderGyms() {
		// a structure showing a gym and the teams inside of it
		var gymList = this.state.gyms.map((gym) => {
			return (
				<div>
					<li key={{gym} + '0'} gym={gym} timeslot='700' side='court-a'>{gym} 7:00PM - Court A</li>
					<li key={{gym} + '1'} gym={gym} timeslot='700' side='court-b'>{gym} 7:00PM - Court B</li>
					<li key={{gym} + '2'} gym={gym} timeslot='830' side='court-a'>{gym} 8:30PM - Court A</li>
					<li key={{gym} + '3'} gym={gym} timeslot='830' side='court-b'>{gym} 8:30PM - Court B</li>
				</div>
			);
		});

		return gymList;
	}

	renderTeams() {
		// draw gyms

		var gyms = this.state.gyms.map((curGym) => {			
			// Each gym has 4 slots
			var timeslot1 = 700;
			var timeslot2 = 830;
			var courtA = 'court-a';
			var courtB = 'court-b';


			var gymSlots = [];
			gymSlots.push(curGym + '-' + timeslot1 + '-' + courtA);
			gymSlots.push(curGym + '-' + timeslot2 + '-' + courtA);
			gymSlots.push(curGym + '-' + timeslot1 + '-' + courtB);
			gymSlots.push(curGym + '-' + timeslot2 + '-' + courtB);

			return (
				<div key={curGym}>
				<div>
					<Gym gym={curGym} key={{curGym} + '0'} className='gym-slot' id={gymSlots[0]} timeslot='700' court='court-a' teamData={this.state.teams}>{gymSlots[0]}</Gym>
					<Gym gym={curGym} key={{curGym} + '2'} className='gym-slot' id={gymSlots[2]} timeslot='700' court='court-b' teamData={this.state.teams}>{gymSlots[2]}</Gym>
				</div>
					<div>
					<Gym gym={curGym} key={{curGym} + '1'} className='gym-slot' id={gymSlots[1]} timeslot='830' court='court-a' teamData={this.state.teams}>{gymSlots[1]}</Gym>
					<Gym gym={curGym} key={{curGym} + '3'} className='gym-slot' id={gymSlots[3]} timeslot='830' court='court-b' teamData={this.state.teams}>{gymSlots[3]}</Gym>
					</div>
				</div>
			);
		});

		// draw unscheduled
		var unscheduledTeams = this.state.teams.map((curTeam) => {
			console.log(curTeam);
			//(curTeam.name, 'Garden City', '700', 'court-a')
			if (curTeam.gym == "none" && curTeam.timeslot == 0) {
				console.log("Add To List: " + curTeam.name);
				return (
					<div className='unscheduled-team' key={curTeam.name} onClick={this.setScheduled.bind(this, curTeam.name, 'Garden City', '700', 'court-a')}>
						{curTeam.name}
					</div>
				);
			}
			return;
		});

		return (
			<div>
				<div>
					<p>Gyms: </p>
					{gyms}
				</div>		
				<br className='clear-float'></br>
				<div>
					<p>Unscheduled Teams: </p>
					{unscheduledTeams}
				</div>
			</div>
		);
	}
}

export default scheduler;