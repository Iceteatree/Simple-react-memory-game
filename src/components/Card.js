import React from 'react';

// creating a functional component called Card.
// Using es6 syntax to specify these specific properties thereby we don't have to type props.exampleprop everywhere. 
const Card = ({ 
    handleClick, 
    id, 
    type, 
    flipped, 
    solved,
    height, 
    width, 
    disabled
}) => {

    return <div
        // If the card is flipped it is gonna have a className of flipped, if not it will have an empty string value which signifies do nothing
        className={`flip-container ${flipped ? 'flipped' : ''}`}
        style={{width, height}}
        // Creating an onClick event function that says if the disabled state is true do nothing if not activate the handleClick method.
        onClick={()=> disabled ? null : handleClick(id)}
        >
        <div className="flipper">
            <img
                style={{height, width}}
                className={flipped ? 'front' : 'back'}
                // If the card is flipped or solved we are going to use the front image otherwise we are going to use the back image.
                src={flipped || solved ? `/img/${type}.svg` : '/img/back.svg' }
                alt={type}
            />
        </div>
    </div>
}

// Export the Card component
export default Card