import { useState } from 'react'
import './App.css'

function App() {
  const [person, setPerson] = useState("X");
  const [winner, setWinner] = useState("");
  const [isDraw, setIsDraw] = useState(false);
  const [isGaemeOver, setIsGameOver] = useState(false);

  // initial grid state with some pre-filled values for testing
  const [grid, setGrid] = useState([
    ["X", "O", ""],
    ["", "X", "O"],
    ["", "X", ""],
  ])

  const resetGrid = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ])
  }

  const handleCellClick = (event, rowIndex, colIndex) => {
    event.stopPropagation();
    console.log("Cell clicked: ", rowIndex, colIndex);

    // Don't update the cell if it's already filled
    if (grid[rowIndex][colIndex] !== "") {
      return;
    }

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
