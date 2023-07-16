import { useState } from 'react';

import Board from './Board';
import HistoryPane from './HistoryPane';



export default function Game() {
	const [history, setHistory] = useState([Array(10).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares, nextCellIndex) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}


	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} />
			</div>
			<div className="game-info">
				<HistoryPane history={history} jumpTo={jumpTo} currentMove={currentMove} />
			</div>
		</div>
	);
}