import React, {Component} from 'react';

const scoreEntry = (props) => {
	console.log(props);
	// convert list of values to td
	const scores = props.teamScore.map((score) => {
		if (score==0) {
			return <td className='score score-unknown'></td>;
		} else if (score < 0) {
		// loss
			return <td className='score score-loss'></td>
		} else if (score > 0) {
			return <td className='score score-win'></td>
		}
		else { return <td className='score'></td>}
	});

	console.log(scores);

	return (
		<tr>
			<td className='teamName'>{props.teamName}</td>
			{scores}
		</tr>
		);
};

export default scoreEntry;