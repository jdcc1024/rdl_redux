import React, {Component} from 'react';

 // export default 
 class gym extends Component {

	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			id: this.props.id,
			name: this.props.gym,
			timeslot: this.props.timeslot,
			court: this.props.court,
			teamData: this.props.teamData
		};

	this.renderGymTeams = this.renderGymTeams.bind(this);
	}

	componentDidMount() {
		// pull play history
	}

	render() {
		var gymTeams = this.renderGymTeams();
		var timeslot = "unknown";
		if (this.props.timeslot == '700') timeslot = "7:00";
		if (this.props.timeslot == '830') timeslot = "8:30";

		var court = "unknown";
		if (this.props.court == 'court-a') court = "Court A";
		if (this.props.court == 'court-b') court = "Court B";

		// console.log(this.props);
		return (
			<div className='droppable-area'>
				<div className='gym-name'><div>{this.state.name}</div> {timeslot}PM - {court}</div>
				<div>
					{gymTeams}
				</div>
			</div>
		)
	}

	renderGymTeams() {		
		console.log("Render Gyms!");
		console.log(this.props);
		var listTeams = this.props.teamData.map((team) =>{
			if (team.timeslot == this.props.timeslot && team.side == this.props.court && team.gym == this.props.gym) {
				return (
					<li className='scheduled-team' key={team.name}>{team.name}</li>
				);
			}
		});

		return (
			<ul>
				{listTeams}
			</ul>
		)
	}
}

export default gym;