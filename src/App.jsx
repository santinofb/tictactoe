import { useState } from "react"

const TURNS = {
  X: '✕',
  O: '◯'
}

const Square = ({ children, isSelected, isUnselected, updateBoard, index }) => {
  const className = `size-24 border-2 border-solid dark:border-gray-200 border-gray-800 rounded-md grid place-items-center cursor-pointer text-5xl 
      ${isSelected ? 'bg-blue-300 dark:bg-blue-500 dark:border-transparent border-transparent text-[40px] size-[70px]' : ''} 
      ${isUnselected ? 'dark:border-transparent border-transparent text-[40px] size-[70px]' : ''}`
  return (
    <div className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)

  return (
    <main className="w-fit mx-auto my-10 text-center">
      <section className="grid grid-cols-3 gap-2.5">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
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
    </main>
  )
}

export default App
