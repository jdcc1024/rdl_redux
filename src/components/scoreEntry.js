import React, {Component} from 'react';
import ScoreData from './scoreData';

const scoreEntry = (props) => {
	// console.log(props);

	// convert list of values to td
	const scores = props.teamScore.map((score) => {
		console.log(score);
		if (score==0) {
			return <ScoreData score="unknown"></ScoreData>;
		} else if (score < 0) {
			return <ScoreData score="loss"></ScoreData>;
		} else if (score > 0) {
			return <ScoreData score="win"></ScoreData>;
		}		
	});

	// console.log(scores);

	return (
		<tr>
			<td className='teamName' onClick={() => props.click()}>{props.teamName}</td>
			{scores}
		</tr>
		);
};

export default scoreEntry;