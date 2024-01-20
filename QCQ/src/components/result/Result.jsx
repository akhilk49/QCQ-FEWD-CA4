import React from 'react';
import './Result.css'

export default function Result({ setScore, score, setCurrentQuestion, setShowResults, length, restartGame }) {
  return (
    <div className="final-results">
      <h1>Final Results</h1>
      <h2>
        {score} out of {length} correct - ({(score / length) * 100}%)
      </h2>
      <button onClick={() => restartGame()}>Restart game</button>
    </div>
  );
}
