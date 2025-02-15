import { useState } from "react"

const TURNS = {
  X: '✕',
  O: '◯'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const Square = ({ children, isSelected, isUnselected, updateBoard, index }) => {
  const className = `size-24 border-2 border-solid dark:border-gray-200 border-gray-800 rounded-md grid place-items-center cursor-pointer text-5xl 
      ${isSelected ? 'bg-blue-300 dark:bg-blue-500 dark:border-transparent border-transparent text-[40px] size-[70px]' : ''} 
      ${isUnselected ? 'dark:border-transparent border-transparent text-[40px] size-[70px]' : ''}`

const handleClick = () => {
  updateBoard(index)
}

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }

    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if (board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

// TODO: Agregar funcionalidad de volumen

  return (
    <main className="w-fit mx-auto my-10 text-center">
      <section className="flex justify-center m-auto w-fit relative rounded-lg gap-2.5">
        <button 
            className="w-25 py-2 px-3 my-4 mx-auto bg-transparent border-2 border-solid dark:border-gray-200 border-gray-800 rounded-md font-bold cursor-pointer hover:dark:bg-white/80 hover:bg-black/80 hover:dark:text-gray-800 hover:text-gray-200 transition-all duration-200"
            onClick={resetGame}
          >
          Reset
        </button>

        <button 
            className="w-fit py-2 px-4 my-4 mx-auto bg-transparent border-2 border-solid dark:border-gray-200 border-gray-800 rounded-md font-bold cursor-pointer hover:dark:bg-white/80 hover:bg-black/80 hover:dark:text-gray-800 hover:text-gray-200 transition-all duration-200"
          >
          V
        </button>
      </section>

      <section className="grid grid-cols-3 gap-2.5">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="flex justify-center my-4 mx-auto w-fit relative rounded-lg gap-2.5">
        <Square isSelected={turn === TURNS.X} isUnselected={turn === TURNS.O}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O} isUnselected={turn === TURNS.X}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className="absolute w-[100vw] h-[100vh] top-0 left-0 grid place-items-center dark:bg-[rgba(0,0,0,0.7)] bg-[rgba(114,114,114,0.7)]">
            <div className="dark:bg-[#111] bg-white/80 backdrop-blur w-80 h-80 border-2 border-solid dark:border-gray-200 border-gray-800 rounded-xl flex flex-col justify-center items-center gap-5">
              <h2 className="text-3xl font-semibold">
                {
                  winner === false
                    ? 'Draw'
                    : `Winner!`
                }
              </h2>

              <header className="my-0 mx-auto w-fit rounded-xl flex gap-4">
                {winner && <Square isSelected={true}>{winner}</Square>}
              </header>

              <footer>
                <button 
                    className="w-25 py-2 px-3 m-6 bg-transparent border-2 border-solid dark:border-gray-200 border-gray-800 rounded-md font-bold cursor-pointer hover:dark:bg-gray-200 hover:bg-gray-800 hover:dark:text-gray-800 hover:text-gray-200 transition-all duration-200"
                    onClick={resetGame}
                >
                  Reset
                </button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
