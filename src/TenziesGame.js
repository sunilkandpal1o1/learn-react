import { useState, useEffect } from 'react'
import ReactConfetti from 'react-confetti'
import './App.css'
import Die from './Die'
import { generateNewDie, allNewDice } from './helper'

function Tenzies() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [highScore, setHighScore] = useState({})
  const [currentScore, setCurrentScore] = useState({
    rollCount: 0,
    time: 0
  })
  const [timer, setTimer] = useState()

  function startTimer() {
    setTimer(setInterval(() => {
      setCurrentScore( prev => ({ ...prev, time: prev.time + 1}) )
    }, 1000))
  }
  useEffect( () => {
    const score = JSON.parse(localStorage.getItem('highScore'))
    if(score) {
      setHighScore(score)
    }
    startTimer()

  }, [])

  
  

  function rollDice() {
    if( !tenzies ) {
      setCurrentScore( prev => ( { ...prev, rollCount: prev.rollCount + 1 } ) )
      setDice( prevDie => prevDie.map( die => {
        return die.isHeld ? 
          die :
          generateNewDie()
      }) )
    } else {
      setTenzies(false)
      setDice( allNewDice() )
      setCurrentScore({
        rollCount: 0,
        time: 0
      })
      // clearInterval(timer)
      startTimer()

      const savedHighScore = localStorage.getItem('highScore')

      setHighScore(JSON.parse(savedHighScore))
    }
  }

  function holdDie(id) {
    setDice(prevDie => prevDie.map( die => {
      return die.id == id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  useEffect( () => {
    // console.log("dice changed")
    let allHeld = true
    let allSameValue = true
    const value = dice[0].value

    dice.forEach( die => {
      if( !die.isHeld ) {
        allHeld = false
      }
      if( die.value != value ) {
        allSameValue = false
      }
    })

    if( allHeld && allSameValue ) {
      clearInterval(timer)
      setTenzies(true)
      // setCurrentScore( prev => {        
      //   return { 
      //     ...prev, 
      //     time: +(Math.round( (( Date.now() - prev.time ) / (1000 )) + "e+2")  + "e-2")
      //   }

      // });
    }
  }, [dice])
  
  useEffect( () => {
    if(tenzies) {
      if( !highScore.rollCount || currentScore.rollCount < highScore.rollCount) {
        setHighScore(currentScore)
        localStorage.setItem('highScore', JSON.stringify(currentScore))
      }
    }
  }, [tenzies] )

  const diceElements = dice.map( die => (
    <Die 
      key={die.id}
      value={die.value} 
      isHeld={die.isHeld} 
      holdDie={() => holdDie(die.id)}
    />))

  return (
    <main>
      { tenzies && <ReactConfetti />}
      <div className='info'>
        <h1>Tenzies</h1>
        <p>Roll until all the dice are same. Hold any dice by clicking on it.</p>
      </div>
      <div>
        { Object.keys(highScore).length > 0 &&
          <div className='score'>
          <h3>High Score</h3>
          <span><span className='bold green'>{highScore.rollCount} </span>
           / <span className='bold green'> {highScore.time}</span> s</span>
          </div>
        }
        <div className='text-center'>
          <span className='bold orange'>{currentScore.rollCount} </span>
           / <span className='bold orange'> {currentScore.time} </span> 
          s</div>

      </div>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={rollDice} className='play-button'>{tenzies ? 'Play Again' : 'Roll'}</button>
    </main>
  );
}

export default Tenzies;
