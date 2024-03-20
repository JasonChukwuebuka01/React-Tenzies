import { useEffect, useState } from 'react'
import Die from './component/Die'
import DiceCount from './component/DiceCount'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {


  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  const [count, setCount] = useState(0);

  const [time, setTime] = useState({});

  const [reset, setReset] = useState(false);

  const { width, height } = useWindowSize();





  function useWindowSize() {

    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }



  useEffect(() => {

    setTime(new Date());

  }, [reset])





  // Checking if all dice array values have the same to change tenzies state to true
  useEffect(() => {

    const endGame = dice.every(die => die.isHeld);

    const diceFirstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === diceFirstValue)

    if (endGame && allSameValue) {
      setTenzies(true);

    };


  }, [dice])




  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(generateNewDice())
    }

    return diceArr;
  };


  const diceElement = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} holdDice={holdDice} />);




  function rollDice() {

    if (!tenzies) {

      setDice(oldDice => oldDice.map(die => {

        return die.isHeld ? die : generateNewDice();
      }));

      setCount(oldCount => oldCount + 1);

    } else {

      setTenzies(false);

      setDice(oldDice => oldDice.map(() => {

        return generateNewDice();

      }));

      setCount(0);

      setReset(oldReset => !oldReset)

    };


  };





  function holdDice(id) {
    setDice(oldDice => oldDice.map(oldDie => oldDie.id === id ? { ...oldDie, isHeld: !oldDie.isHeld } : oldDie))
  }




  return (
    <main >
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-wrapper">
        {diceElement}
      </div>


      {tenzies &&
        <Confetti
          width={width}
          height={height}
        />
      }

      {tenzies &&
        <DiceCount
          count={count}
          time={time}
          tenzies={tenzies}
        />}


      <button
        className="roll-button"
        onClick={rollDice}
       >
        {tenzies ? "Reset" : "Roll"}
      </button>



    </main>
  )
}

export default App
