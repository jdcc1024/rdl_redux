import React from 'react';
import ReactDOM from 'react-dom';
import Matchup from './components/matchup';

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

const App = () => {
	return (
			<Matchup numGames='5'></Matchup>		
	);
}

// React.render(App);
ReactDOM.render(<App/>, document.querySelector('.container'));