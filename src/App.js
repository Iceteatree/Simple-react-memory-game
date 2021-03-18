import React, { useState, useEffect } from 'react'
import Board from './components/Board';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [wins, setWins] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    resizeBoard()
    setCards(initializeDeck())
  }, [])

  useEffect(() => {
    preloadImages()
  }, cards);

  useEffect(() => {
    const resizeListener = window.addEventListener('resize', resizeBoard)
    return () => window.removeEventListener('resize', resizeListener)
  })

  useEffect(() => {
    checkScore();
  }, [score]); // Only re-run the effect if count changes


  const shuffle = (array) => {
    const _array = array.slice(0);
    for (var i=0; i<_array.length-1; i++) {
        var randomIndex = Math.floor(Math.random() * (i+1));
        var temp = _array[i];
        _array[i] = _array[randomIndex];
        _array[randomIndex] = temp;
    }
    return _array;
  }

  const initializeDeck = () => {
    let id = 0;
    const cards= ['chick', 'chicken', 'elephant', 'koala', 'leapard', 'lion', 'monkey', 'rabbit'].reduce((acc, type) => {
        acc.push({
            id: id++,
            type
        })
        acc.push({
            id: id++,
            type
        })
        return acc
    }, [])
    return shuffle(cards);
  }
  
  const handleClick = (id) => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id])
      setDisabled(false)
    }
    else {
      if (sameCardClicked(id)) return
      setFlipped([flipped[0],id])
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
        updateScore(score, checkScore);
      } else {
        noMatch();
      }
    }
  }

  const noMatch = () => {
    updateGuesses(wrongGuesses, checkGuesses);
    setTimeout(resetCards, 500);
  }

  const updateScore = (score, refresh) => {
    var newScore = score + 1;
    setScore(score + 1);
    refresh(newScore);
  }

  const updateGuesses = (wrongGuesses, refresh) => {
    var newGuesses = wrongGuesses + 1;
    setWrongGuesses(wrongGuesses + 1);
    refresh(newGuesses);
  }

  const checkScore = (score) => {
    if (score===8) {
      setWins(wins + 1);
      alert("You win")
      newGame();
    }
  }

  const checkGuesses = (wrongGuesses) => {
    if (wrongGuesses===8) {
      setLosses(losses + 1);
      alert("You lose")
      newGame();
    }
  }

  const newGame = () => {
    setSolved([]);
    setCards(initializeDeck());
    setWrongGuesses(0);
    setScore(0);
  }

  const helpUser = () => {
    alert(`How to Play

    Click the squares to the right to reveal the hidden animals.
    Match 2 of the same animals to lock them in.

    You gain a loss if you incorrectly guess 8 times.

    You gain a win if you correctly guess all the items.
    `);
  }

  const changeSrc = (card) => {
    const src = `/img/${card.type}.svg`;
    new Image().src = src;
  }

  const preloadImages = () => 
    cards.map(changeSrc)
  

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  }

  const sameCardClicked = (id) => flipped.includes(id);

  const isMatch = (id) => {
    const clickedCard = cards.find((card)=> card.id ===id);
    const flippedCard = cards.find((card) => flipped[0]===card.id);
    return flippedCard.type ===clickedCard.type;
  }

  const resizeBoard = () => {
    setDimension(Math.min(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ))
  }

  return (
    <div className="app">
      <Navbar 
        wins = {wins}
        losses = {losses}
        score = {score}
        wrongGuesses = {wrongGuesses}
        newGame = {newGame}
        help = {helpUser}
      />
      <Board 
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
      <Footer />
    </div>
  )
}

export default App;

// Used this tutorial for help https://www.youtube.com/watch?v=MLNLT_-mBA0