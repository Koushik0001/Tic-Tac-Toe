
export default function Square({ value, onSquareClick, className }) {
	if (className) {
		className += " " + "square";
		return (
			<button className={className} onClick={onSquareClick} >
				{value}
			</button>
		);
	}

	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}