import React from "react";

// Creating a functional component called Navbar. It holds props as its input.
const Navbar = props => (
  <nav className="navbar">
    <div>
      <ul className="navbar-nav">
      <li className="instruction">
          <h1>React Card Guess Game</h1>
          <h3 className="instruction">Find the matching pairs</h3>
        </li>
        <li className="nav-item">
          {/* Buttons that trigger on click events which call the relevant methods needed */}
          <button className="restart-btn" onClick={() => props.newGame()}>
            Restart Game
          </button>
          <button className="help-btn" onClick={() => props.help()}>
            Help
          </button>
        </li>
        <li className="nav-item">
            {/* Display the stored wins and losses value */}
              <h5 className="wins">Wins: {props.wins} </h5>         
              <h5 className="losses">Losses: {props.losses} </h5>
        </li>
        <li className="nav-item">
            {/* Displays the correct and incorrect values */}
            <h5 className="score">Current Score: {props.score}/8</h5>
            <h5 className="wrongGuesses">Incorrect Guesses: {props.wrongGuesses}/8</h5>
        </li>
      </ul>
    </div>
  </nav>
);

// Expoting Navbar component
export default Navbar;