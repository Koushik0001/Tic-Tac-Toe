import { useState } from "react";

export default function HistoryPane({ history, jumpTo, currentMove }) {
	const [sortOrder, setSortOrder] = useState(1);

	function handleSortOrder() {
		setSortOrder(sortOrder === 1 ? -1 : 1);
		moves.reverse();
	}
	const moves = history.map((squares, move) => {
		if (move != currentMove) {
			let description;
			if (move > 0) {
				description = 'Go to move #' + move + ` [${Math.floor(squares[9] / 3)}, ${squares[9] % 3}]`;
			} else {
				description = 'Go to game start';
			}

			return (
				<li key={move}>
					<button onClick={() => jumpTo(move)}>{description}</button>
				</li>
			);
		}
		else {
			let cellCoordinate = ''
			if (squares[9])
				cellCoordinate = ` [${Math.floor(squares[9] / 3)}, ${squares[9] % 3}]`
			return (
				<li key={move}>
					<span>You are at move #{currentMove}{cellCoordinate}</span>
				</li>
			)
		}
	});

	if (sortOrder === -1)
		moves.reverse();
	return (
		<>
			Sort order : <button onClick={handleSortOrder}>{sortOrder === 1 ? "Increasing" : "Decreasing"}</button>
			<ul>{moves}</ul>
		</>
	)
}