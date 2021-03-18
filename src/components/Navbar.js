import React from "react";

const Navbar = props => (
  <nav className="navbar">
    <div>
      <ul className="navbar-nav">
      <li className="instruction">
          <h1>React Card Guess Game</h1>
          <h3 className="instruction">Find the matching pairs</h3>
        </li>
        <li className="nav-item">
          <button className="restart-btn" onClick={() => props.newGame()}>
            Restart Game
          </button>
          <button className="help-btn" onClick={() => props.help()}>
            Help
          </button>
        </li>
        <li className="nav-item">
              <h5 className="wins">Wins: {props.wins} </h5>         
              <h5 className="losses">Losses: {props.losses} </h5>
        </li>
        <li className="nav-item">
            <h5 className="score">Current Score: {props.score}/8</h5>
            <h5 className="wrongGuesses">Incorrect Guesses: {props.wrongGuesses}/8</h5>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;