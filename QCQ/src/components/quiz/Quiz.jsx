import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';
import { questions } from '../../assets/questions';

const Quiz = ({ onScoreUpdate }) => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(questions[index]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  // Question Highlight
  const focusQuestion = useRef();

  useEffect(() => {
    // Update the question when the index changes
    setQuestion(questions[index]);
  }, [index]);

  const handleOptionClick = (selectedId) => {
    const isCorrect = question.options.find(option => option.id === selectedId)?.isCorrect || false;
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect!');

    // Update the score based on correctness
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    // Automatically move to the next question after a short delay
    setTimeout(() => {
      setSelectedOption(null);
      setFeedback(null);
      setIndex(prevIndex => prevIndex + 1);

      // Call the callback function to update the score in the parent component
      onScoreUpdate(score + (isCorrect ? 1 : 0));
    }, 100); // Adjust the delay as needed
  };

  const handleFocus = () => {
    focusQuestion.current.style.color = 'red';
  };

  const handleNoFocus = () => {
    focusQuestion.current.style.color = 'darkblue';
  };

  return (
    <div className='container'>
      <div className='index'>Question: {index + 1} out of {questions.length}</div>
      <h2 ref={focusQuestion}>{index + 1}. {question.text}</h2>
      <ul>
        {question.options.map((option) => (
          <li
            key={option.id}
            className={selectedOption === option.id ? 'selected' : ''}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.text}
          </li>
        ))}
      </ul>
      {/* {feedback && <p>{feedback}</p>} */}
      <div className='highlightbuttons'>
        <button onClick={handleFocus}>Highlight</button>
        <button onClick={handleNoFocus}>Remove Highlight</button>
      </div>
    </div>
  );
};

export default Quiz;

