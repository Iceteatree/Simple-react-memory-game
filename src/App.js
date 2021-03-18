// Importing React components and specifically the useState and useEffect hooks
import React, { useState, useEffect } from 'react'

// Importing relevant components
import Board from './components/Board';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Creating a functional component called App. Using the Hook useState to allow us to change the state of a function without the need to create or convert to a class component.
// The reason I want to try this out is specifically because the 'this' keyword within class functions really annoyed me.
const App = () => {
  // I'll explain one of the useStates so you get an idea of what is happening
  // I declare a state variable called cards and set its initial state value to an empty array. React will remember its current value between re-renders and provide the most recent one to our function. If we want to update the current cards variable, we can call the setCards function. The intial state value can be anythinng. Boolean, numbers, strings or arrays. All datatypes are valid.
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [wins, setWins] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [losses, setLosses] = useState(0);

  // In addition to the useState hook. I am also using it in conjunction with the useEffect hook.
  // This hook tells React that the component needs to do something after the render. React will remember the function passed(the effect) and call it later after performing the DOM update.
  // For example below I call the useEffect hook. This tells React that something needs to be done after it updates the DOM. In this case after the DOM updates it calles the resizeBoard method and changes the setCards state variable to whatever happens within the initialiseDeck function. The second arguement "[]"" tells the useEffect to watch if that value needs to be called again. By giving it an empty array it is telling it that it should only call it one time as the array will not be empty afterwards. Therefore not calling teh useEffect again and again and again.
  useEffect(() => {
    resizeBoard()
    setCards(initializeDeck())
  }, [])

  // Only re-run the effect if the cards value changes
  useEffect(() => {
    preloadImages()
  }, cards);

  // This effect says when the pages resize the board size changes.
  useEffect(() => {
    const resizeListener = window.addEventListener('resize', resizeBoard)
    return () => window.removeEventListener('resize', resizeListener)
  })

// Only re-run the effect if the score count changes
  useEffect(() => {
    checkScore();
  }, [score]); 

  // This function shuffles our cards
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

  // This function holds all our initial values and data
  const initializeDeck = () => {
    let id = 0;
    // Reduce builds a new array based on each iteration, the first argument is the accumulator which is what is going to be built overtime, the second argument is the index value.
    const cards= ['chick', 'chicken', 'elephant', 'koala', 'leapard', 'lion', 'monkey', 'rabbit'].reduce((acc, type) => {
        // Pushing the new javascript object to the accumulator array. Its id is gonna be an id that increases . The index is gonna be the type we pass in.
        acc.push({
            id: id++,
            type
        })
        // We push it twice because we want two of the same objects. 
        acc.push({
            id: id++,
            type
        })
        // After we make the change we return the accumulator. The second argument to reduce is the dafult value for the accumulator which in this case we return an empty array
        return acc
    }, [])
    // After all that is done call the shuffle function and pass in the array as an input
    return shuffle(cards);
  }
  
  // handClick function takes in the id as an input
  const handleClick = (id) => {
    // Sets the state of setDisabled to true so we can't click the same card multiple times
    setDisabled(true);
    // If the flipped state is equal to nothing then we are agoing to call the setFlipped method which takes id as an input and then chaange the state of setDisabled to False. So that we can click again.
    if (flipped.length === 0) {
      setFlipped([id])
      setDisabled(false)
    }
    // Else if the id of the matching object is true then set the state of setFlipped .
    else {
      if (sameCardClicked(id)) return
         setFlipped([flipped[0],id])
      // else if the match id is true then call the following
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
        updateScore(score, checkScore);
      } 
      // Else if all else fails call this noMatch function
      else {
        noMatch();
      }
    }
  }

  // function noMatch calls the updateGuesses function and then sets a 500ms break before calling the resetCards function
  const noMatch = () => {
    updateGuesses(wrongGuesses, checkGuesses);
    setTimeout(resetCards, 500);
  }

  // the updateScore function increases the correct score by one. then updates the setScore variable and finally calls the refresh method to update the newScore variable.
  const updateScore = (score, refresh) => {
    var newScore = score + 1;
    setScore(score + 1);
    refresh(newScore);
  }

  // The update guesses function does the saame as the above except it counts all the incorrect guesses.
  const updateGuesses = (wrongGuesses, refresh) => {
    var newGuesses = wrongGuesses + 1;
    setWrongGuesses(wrongGuesses + 1);
    refresh(newGuesses);
  }

  // The checkScore function checks to see if the correct score is equal to 8 then call the following functions
  const checkScore = (score) => {
    if (score===8) {
      // Increase the setWins by 1
      setWins(wins + 1);
      // Popup that tells the user they have won a round.
      alert("You Win!")
      // Resets the game
      newGame();
    }
  }

  // Does the same as the above except for incorrect guesses and then displaying a you lose.
  const checkGuesses = (wrongGuesses) => {
    if (wrongGuesses===8) {
      setLosses(losses + 1);
      alert("You Lose")
      newGame();
    }
  }

  // NewGame function resets our states to default values
  const newGame = () => {
    setSolved([]);
    setCards(initializeDeck());
    setWrongGuesses(0);
    setScore(0);
  }

  // Help User function basically is just a pop up that tells the user how to play
  const helpUser = () => {
    alert(`How to Play

    Click the squares to the right to reveal the hidden animals.

    Match 2 of the same animals to lock them in.

    You gain a loss if you incorrectly guess 8 times.

    You gain a win if you correctly guess all the items.

    To restart a game, press the "Restart Game" button.

    To reset the wins and losses, press F5. Alternatively refresh your browser.

    Good Luck Have Fun`);
  }

  // This function just sets the src of the images by creating a new src attribute
  const changeSrc = (card) => {
    const src = `/img/${card.type}.svg`;
    new Image().src = src;
  }

  // This function maps the cards array and adds a src attribute to it.
  const preloadImages = () => 
    cards.map(changeSrc)
  
  // resetCards sets the state of Flipped and disabled to their default values
  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  }

  // this function checks if the flipped variable holds a id string within it.
  const sameCardClicked = (id) => flipped.includes(id);

  // This function checks if the flippedCard type is equal to the clickCard type.
  const isMatch = (id) => {
    //  The clickedCard variable holds the object of the found cards id and checks if it matches the id input.
    const clickedCard = cards.find((card)=> card.id ===id);
    //  The flippedCard variable holds the object of the found cards id and checks if it matches the flipped state of 0.
    const flippedCard = cards.find((card) => flipped[0]===card.id);
    // Checks if the types are the same.
    return flippedCard.type === clickedCard.type;
  }

  // Function the resizes the board according to the dimensions of the users client
  const resizeBoard = () => {
    setDimension(Math.min(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ))
  }

  return (
    // Renders these components
    <div className="app">
      {/* Renders Navbar with these props passing down the state values to the children*/}
      <Navbar 
        wins = {wins}
        losses = {losses}
        score = {score}
        wrongGuesses = {wrongGuesses}
        newGame = {newGame}
        help = {helpUser}
      />
      {/* Renders Board with these props passing down the state values to the children*/}
      <Board 
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
      {/* Renders Footer */}
      <Footer />
    </div>
  )
}

// Export the App component
export default App;

// Used this tutorial for help https://www.youtube.com/watch?v=MLNLT_-mBA0