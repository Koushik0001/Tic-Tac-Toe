import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, totalMoves }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else{
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  if(totalMoves == 10)
    status = "Game Draw"

  const boardRows = []
  for(let i=0; i<3; i++){
    const boardcells = []
    for(let j=0; j<3; j++){
      if(3*i+j in winLine)
        boardcells.push(<Square key={j} value={squares[3*i+j]} onSquareClick={() => handleClick(3*i+j)} className="winner" />)
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

function HistoryPane({history, jumpTo, currentMove}){
  const [sortOrder, setSortOrder] = useState(1);

  function handleSortOrder(){
    setSortOrder(sortOrder===1?-1:1);
    moves.reverse();
  }
  const moves = history.map((squares, move) => {
    if(move != currentMove){
      let description;
      if (move > 0 ) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
    else 
      return(
        <li key={move}>
          <span>You are at move {currentMove}</span>
        </li>
      )
  });

  if(sortOrder===-1)
    moves.reverse();
  return(
    <>
      Sort order : <button onClick={handleSortOrder}>{sortOrder===1?"Increasing":"Decreasing"}</button>
      <ul>{moves}</ul>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
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
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} totalMoves={history.length}/>
      </div>
      <div className="game-info">
        <HistoryPane history={history} jumpTo={jumpTo} currentMove={currentMove} />
      </div>
    </div>
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
      return [squares[a], lines[i]];
    }
  }
  return [null, []];
}
