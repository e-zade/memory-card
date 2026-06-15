import React from 'react';
import './card.css';

const Card = ({ emoji, isFlipped, isMatched, onClick, index }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched && onClick) {
      onClick(index);
    }
  };
  // hi

  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          {isFlipped || isMatched ? emoji : '?'}
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
};

export default Card;
