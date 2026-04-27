import { useState, useEffect } from 'react'
import './App.css'

/**
 * Tic Tac Toe game requirements:
 * Show a 3x3 grid game board which allows two players to play.
 * First turn is always "X", then O, then X, and so on.
 * wins who either fills in a row, columnd or diagonal with their symbol first.
 * 
 * Implementation:
 * 1) show a game board 3x3 grid with empty cells
 * 2) allow user input and register clicked cell (either X or O, depending on whose turn it is)
 * 3) check for win or draw conditions
 * 4) show win or draw message
 * 5) reset game board for new game
 * 
 */

function App() {
  const [person, setPerson] = useState("X");
  const [winner, setWinner] = useState(undefined);
  const [isDraw, setIsDraw] = useState(false);
  const [isGaemeOver, setIsGameOver] = useState(false);

  // initial grid state with some pre-filled values for testing
  const [grid, setGrid] = useState([
    ["X", "O", ""],
    ["", "X", "O"],
    ["", "X", ""],
  ])

  useEffect(() => {
    // check for win conditions
    // check rows
    for (let i = 0; i < 3; i++) {
      if(grid[i][0] === grid[i][1] &&
         grid[i][1] === grid[i][2] && 
         grid[i][0] !== "") {
        setWinner(grid[i][0]);
      }
    }
    // check columns
    for (let i = 0; i < 3; i++) {
      if (grid[0][i] === grid[1][i] &&
          grid[1][i] === grid[2][i] &&
          grid[0][i] !== "") {
        setWinner(grid[0][i]);
      }
    }
    // check diagonals
    if(grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[0][0] !== "") {
      setWinner(grid[0][0]);
    }
    if(grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[0][2] !== "") {
      setWinner(grid[0][2]);
    }

    // check for draw conditions
    if (!winner) {
      let isDraw = true;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] === "") {
            isDraw = false;
          }
        }
      }
      setIsDraw(isDraw);
    }
  }, [grid])

  const resetGrid = () => {
    setWinner(undefined);
    setIsDraw(false);
    setPerson("X");
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ])
  }

  const handleCellClick = (event, rowIndex, colIndex) => {
    event.stopPropagation();
    if (winner || isDraw) {
      return;
    }
    // Don't update the cell if it's already filled
    if (grid[rowIndex][colIndex] !== "") {
      return;
    } else {
      const newGrid = [...grid];
      newGrid[rowIndex][colIndex] = person;
      setGrid(newGrid);
    }

    console.log("Cell clicked: ", rowIndex, colIndex);
    setPerson(prevPerson => prevPerson === "X" ? "O" : "X");
  }

  const printRow = (row, rowIndex) => {
    return (
      row.map((cell, colIndex) => {
        const cellFontColor = cell === "X" ? "red" : "blue";
        return (
          <div 
            onClick={event => handleCellClick(event, rowIndex, colIndex)} 
            key={colIndex}
            className={"cell " + cellFontColor}>
            {cell}
          </div>
      )})
    )
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Tic Tac Toe</h1>
          <div>{person}'s turn</div>
          <div className="grid">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {printRow(row, rowIndex)}
              </div>
            ))}
          </div>
        </div>
        {winner && <div>Winnder is {winner}</div>}
        {isDraw && <div>It's a draw!</div>}
        <button
          type="button"
          className="counter"
          onClick={() => resetGrid()}
        >
          Reset Grid
        </button>
      </section>

      <div className="ticks"></div>

      <section id="spacer"></section>
    </>
  )
}

export default App
