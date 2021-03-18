import React from 'react';
// importing Card component 
import Card from './Card';

// creating a functional component called Board.
// Directly specifying props to be used.
const Board = ({ disabled, dimension, cards, flipped, solved, handleClick }) => {
    return (
        <div className="board">
            {/* <mapping the cards array to create a new array that holds each item in a <Card>  component with custom properties*/}
            {cards.map((card) => (
                <Card 
                    //key is based of the original arrays id attribute. Key is always needed otherwise when mapping will give an error.
                    key={card.id}    
                    id={card.id}
                    type={card.type}
                    // Specifying the size of the cards based off the dimension property.
                    width={dimension/4.5}
                    height={dimension/4.5}
                    // Check if the flipped property includes the string within holding card id. Update it to the flipped variable
                    flipped={flipped.includes(card.id)}
                    solved={solved.includes(card.id)}
                    // each card can trigger the handleclick method
                    handleClick={handleClick}
                    //  this property will hold the value of disabled or if the solved property included the string card.id
                    disabled={disabled || solved.includes(card.id)}
                />
            ))}
        </div>
    )
}

// exporting the Board component
export default Board;

