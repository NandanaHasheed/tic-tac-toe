import { useState } from "react";
import "./App.css";

function App() {

  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState("");

  const checkWinner = (newBoard) => {

    const patterns = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for (let pattern of patterns) {

      const [a,b,c] = pattern;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }

    }

    return null;
  };


  const handleClick = (index) => {

    if (board[index] || winner) {
      return;
    }


    const newBoard = [...board];

    newBoard[index] = turn;


    setBoard(newBoard);


    const result = checkWinner(newBoard);


    if (result) {

      setWinner(result);

    } 
    else if (newBoard.every(cell => cell !== "")) {

      setWinner("Draw");

    } 
    else {

      setTurn(turn === "X" ? "O" : "X");

    }

  };


  const restart = () => {

    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner("");

  };


  return (

    <div className="game">

      <h1>❌ Tic Tac Toe ⭕</h1>

      <h2>
        {winner 
          ? `Winner: ${winner}`
          : `Turn: ${turn}`
        }
      </h2>


      <div className="board">

        {board.map((cell,index)=>(

          <button
            key={index}
            onClick={()=>handleClick(index)}
          >
            {cell}
          </button>

        ))}

      </div>


      <button className="restart" onClick={restart}>
        Restart Game
      </button>


    </div>

  );

}


export default App;