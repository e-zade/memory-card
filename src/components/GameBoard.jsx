import React from "react";
import Card from "./card";
import "./GameBoard.css";

const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card
          key={index}
          index={index}
          emoji={card.emoji}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default GameBoard;
