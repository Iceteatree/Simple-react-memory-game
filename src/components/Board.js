import React from 'react';

import Card from './Card';


const Board = ({ disabled, dimension, cards, flipped, solved, handleClick }) => {
    return (
        <div className="board">
            {cards.map((card) => (
                <Card 
                    key={card.id}    
                    id={card.id}
                    type={card.type}
                    width={dimension/4.5}
                    height={dimension/4.5}
                    flipped={flipped.includes(card.id)}
                    solved={solved.includes(card.id)}
                    handleClick={handleClick}
                    disabled={disabled || solved.includes(card.id)}
                    {...card}
                />
            ))}
        </div>
    )
}

export default Board;

