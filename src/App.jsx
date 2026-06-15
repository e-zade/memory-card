import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import StatsPanel from "./components/StatsPanel";
import GameBoard from "./components/GameBoard";
import CongratsModal from "./components/CongratsModal";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

const createShuffledCards = () => {
  // 8 cüt kart yarat
  let cards = [];
  for (let i = 0; i < EMOJIS.length; i++) {
    cards.push({
      emoji: EMOJIS[i],
      isFlipped: false,
      isMatched: false,
      id: i * 2,
    });
    cards.push({
      emoji: EMOJIS[i],
      isFlipped: false,
      isMatched: false,
      id: i * 2 + 1,
    });
  }
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

function App() {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem("memoryBestMoves");
    return saved ? parseInt(saved) : null;
  });
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  // Timer
  useEffect(() => {
    if (!timerActive || isGameFinished) return;
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, isGameFinished]);

  // Oyun bitdikdə best score yenilə
  useEffect(() => {
    const allMatched =
      cards.length > 0 && cards.every((card) => card.isMatched === true);
    if (allMatched && !isGameFinished) {
      setIsGameFinished(true);
      setTimerActive(false);

      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem("memoryBestMoves", moves);
      }
    }
  }, [cards, moves, bestScore, isGameFinished]);

  // İki kartı müqayisə et
  const checkMatch = useCallback(
    (idx1, idx2) => {
      if (cards[idx1].emoji === cards[idx2].emoji) {
        // Match
        setCards((prev) =>
          prev.map((card, i) =>
            i === idx1 || i === idx2
              ? { ...card, isMatched: true, isFlipped: true }
              : card,
          ),
        );
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        // No match - 1 saniyə sonra çevir
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) =>
              i === idx1 || i === idx2 ? { ...card, isFlipped: false } : card,
            ),
          );
          setFlippedIndices([]);
          setIsLocked(false);
        }, 800);
      }
    },
    [cards],
  );

  // Kart klik
  const handleCardClick = useCallback(
    (index) => {
      if (isLocked) return;
      if (cards[index].isMatched) return;
      if (cards[index].isFlipped) return;
      if (flippedIndices.length === 2) return;

      // Kartı çevir
      setCards((prev) =>
        prev.map((card, i) =>
          i === index ? { ...card, isFlipped: true } : card,
        ),
      );

      const newFlipped = [...flippedIndices, index];
      setFlippedIndices(newFlipped);

      // Move sayını artır (hər klikdə)
      setMoves((prev) => prev + 1);

      // Əgər 2 kart seçilibsə
      if (newFlipped.length === 2) {
        setIsLocked(true);
        checkMatch(newFlipped[0], newFlipped[1]);
      }
    },
    [cards, isLocked, flippedIndices, checkMatch],
  );

  // Oyunu sıfırla (best qalır)
  const resetGame = useCallback(() => {
    setCards(createShuffledCards());
    setMoves(0);
    setTime(0);
    setFlippedIndices([]);
    setIsLocked(false);
    setIsGameFinished(false);
    setTimerActive(true);
  }, []);

  // New Game (best qalır, eyni reset)
  const newGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  // Yenidən oyna (modal-dan)
  const playAgain = useCallback(() => {
    resetGame();
  }, [resetGame]);

  // İlk dəfə oyunu başlat
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Vaxtı formatla
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="app">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      <div className="game-container">
        <StatsPanel
          moves={moves}
          time={formatTime(time)}
          bestScore={bestScore}
          onNewGame={newGame}
          onRestart={resetGame}
        />
        <GameBoard cards={cards} onCardClick={handleCardClick} />
        <footer className="footer"> </footer>
      </div>
      <CongratsModal isOpen={isGameFinished} onPlayAgain={playAgain} />
    </div>
  );
}

export default App;
