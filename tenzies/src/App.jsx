import Die from "./Die"
import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    function generateAllNewDice() {
    return new Array(10)
                    .fill(0)
                    .map(() => ({
                      value: Math.ceil(Math.random() * 6),
                      isHeld: false,
                      id: nanoid()
    }))
  }

  const [dice, setDice] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)
  const diceElements = dice.map((dieObj) => <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} hold={() => hold(dieObj.id)} />)
  const gameWon =
    dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

    useEffect(() => {
      if (gameWon)
        buttonRef.current.focus()
    }, [gameWon])

  function rollDice() {
    if (!gameWon) {
      setDice(oldDice => {
        return oldDice.map(die => {
          return die.isHeld === true ?
            die : {...die, value: Math.ceil(Math.random() * 6)}
        })
      })
    } else {
        setDice(generateAllNewDice())
    }
  }

  function hold(id) {
      setDice(oldDice => {
        return oldDice.map(die => {
          return die.id === id ?
            {...die, isHeld: !die.isHeld} : die
        }
      )
    })
  }

    return (
      <main>
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>

        <button ref={buttonRef} onClick={rollDice} className="roll-dice">{gameWon ? "New Game" : "Roll"}</button>
      </main>
    )
}
