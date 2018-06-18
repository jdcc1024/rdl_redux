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
			teamData: this.props.teamData,
			numTeams: 0
		};
		this.renderGymTeams = this.renderGymTeams.bind(this);
		this.checkSchedule 	= this.checkSchedule.bind(this);
		this.removeTeam 	= this.removeTeam.bind(this);
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
			<div className='droppable-area' onDragOver={(e) => {e.preventDefault()}} onDrop={(e) => this.checkSchedule(e)}>
				<div className='gym-name'><div>{this.props.gym}</div> {timeslot}PM - {court}</div>
				<div>
					{gymTeams}
				</div>
			</div>
		)
	}

	renderGymTeams() {		
		var listTeams = this.props.teamData.map((team) =>{
			if (team.timeslot == this.props.timeslot && team.side == this.props.court && team.gym == this.props.gym) {
				return (
					<li className='scheduled-team' draggable='true' onDragStart={(e) => this.checkSchedule(e)} onClick={(e) => this.removeTeam(team.name)} key={team.name}>{team.name}</li>
				);
			}
		});

		return (
			<ul>
				{listTeams}
			</ul>
		)
	}

	removeTeam(teamName) {
		console.log(this.state.numTeams);
		this.setState({numTeams: this.state.numTeams--});
		this.props.unschedule(teamName);
	}

	checkSchedule(event) {		
		console.log(this.state.numTeams);
		if (this.state.numTeams < 4) {
			this.setState({numTeams: this.state.numTeams++});
			this.props.handleDrop(event, this.props.gym, this.props.timeslot, this.props.court);
		}
	}

	calculateConfidence() {

	}
}

export default gym;