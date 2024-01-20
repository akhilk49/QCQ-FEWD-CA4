import React, { useEffect, useState } from 'react';
import Quiz from './components/quiz/Quiz';
import Result from './components/result/Result';
import questions from './assets/questions';
import image from './images/logo.jpg';

const App = () => {
  const [theme, setTheme] = useState(false);
  const [themeName, setThemeName] = useState('light');
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleToggle = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    setThemeName(theme ? 'dark' : 'light');
  }, [theme]);

  function backGroundColors(color) {
    document.body.style.backgroundColor = color ? '#6e6a6a' : 'white';
    return {
      backgroundColor: color ? '#6e6a6a' : 'white',
    };
  }

  function textColor(color) {
    return {
      color: color ? 'white' : '#6e6a6a',
    };
  }

  return (
    <>
      <div className="App" style={backGroundColors(theme)}></div>
      <div className="flex">
        <img src={image} alt="Logo" id="logo" />
        <button className="toggle-button" onClick={handleToggle} style={textColor(theme)}>
          {themeName}
        </button>
      </div>
      {showResults ? (
  <Result
    setScore={setScore}
    score={score}
    setCurrentQuestion={setCurrentQuestion}
    setShowResults={setShowResults}
    length={questions.length}
    restartGame={() => {
      setScore(0);
      setCurrentQuestion(0);
      setShowResults(false);
    }}
  />
) : (
  <Quiz onScoreUpdate={optionClicked} />
)}
    </>
  );
};

export default App;

