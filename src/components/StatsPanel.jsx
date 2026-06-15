import React from "react";
import "./StatsPanel.css";

const StatsPanel = ({ moves, time, bestScore, onNewGame, onRestart }) => {
  return (
    <div className="stats-panel">
      <div className="stat-card">
        <div className="stat-label">MOVES</div>
        <div className="stat-value">{moves}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">TIME</div>
        <div className="stat-value">{time}</div>
      </div>
      <div className="stat-card best-score-box">
        <div className="stat-label">BEST SCORE</div>
        <div className="stat-value">{bestScore === null ? "-" : bestScore}</div>
      </div>
      <div className="button-group">
        <button className="btn" onClick={onNewGame}>
          New Game
        </button>
        <button className="btn btn-restart" onClick={onRestart}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default StatsPanel;
