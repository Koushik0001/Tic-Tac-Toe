import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay, currentMove }) {
	function handleClick(i) {
		if (calculateWinner(squares)[0] || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}
		nextSquares[9] = i;
		onPlay(nextSquares);
	}

	const [winner, winLine] = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	if (!winner && currentMove == 9) {
		status = "Game Draw";
	}

	const boardRows = []
	for (let i = 0; i < 3; i++) {
		const boardcells = []
		for (let j = 0; j < 3; j++) {
			let className = null
			if (winLine.includes((3 * i + j)))
				className = "winLine"

			boardcells.push(<Square key={j} value={squares[3 * i + j]} onSquareClick={() => handleClick(3 * i + j)} className={className} />)
		}
		boardRows.push(
			<div key={i} className="board-row">{boardcells}</div>
		);
	}
	return (
		<>
			<div className="status">{status}</div>
			{boardRows}
		</>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return [squares[a], [a, b, c]];
		}
	}
	return [null, []];
}