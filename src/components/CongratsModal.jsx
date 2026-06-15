import React from 'react';
import './CongratsModal.css';

const CongratsModal = ({ isOpen, onPlayAgain }) => {
  if (!isOpen) return null;

  return (
    <div className="congrats-overlay">
      <div className="congrats-modal">
        <span className="congrats-emoji">🎉</span>
        <h2>Təbriklər! Oyunu bitirdiniz!</h2>
        <span className="congrats-emoji">🎉</span>
        <button className="play-again-btn" onClick={onPlayAgain}>
          Yenidən oyna
        </button>
      </div>
    </div>
  );
};

export default CongratsModal;