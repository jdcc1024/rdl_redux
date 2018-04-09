import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import Matchup from './components/matchup';
import Timeslot from './components/timeslot';

// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';

// import App from './components/app';
// import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware()(createStore);

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </Provider>
//   , document.querySelector('.container')
//   );

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedMatch: null,
			numGames: 5,
			numClicks: 0,
			// teams: [] // once we have state from backend, use that to fill array
			teams: ["Eva's Emus", "Brady's Beavers", "Horace's Horses", "Jess' Jellyfish"]
		};
	}

	componentDidMount() {
		// console.log("Mounted!");
		this.setState = {teams: ["Eva's Emus", "Brady's Beavers", "Horace's Horses", "Jess' Jellyfish"]};
	}
	
			// week: this.props.week,
			// gym: this.props.gym,
			// timeslot: this.props.timeslot,
			// numGames: this.props.numGames,
			// selectedMatch: null,
			// teams: this.props.teams,
			// permutations: permutations,
			// numClicks: 0

	// Eventually turn timeslot into JSON with ID and Descr
	render() {
	 	return (	 		
	 		<div>
	 			<Timeslot gym="Spul'u'kwuks" timeslot="7:30" numGames='5' teams={this.state.teams}></Timeslot>
	 		</div>
	 		);
	 }
}

ReactDOM.render(<App/>, document.querySelector('.container'));