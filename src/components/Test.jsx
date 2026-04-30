import React, { useState } from 'react';
import PropTypes from 'prop-types'; // 1. Added this import


const Test = ({ words }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentWord = words[currentIdx];

  // Function to get 3 random wrong answers + 1 correct one
  const getOptions = () => {
    const wrongOptions = words
      .filter(w => w.id !== currentWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.meaning);
    
    return [...wrongOptions, currentWord.meaning].sort(() => 0.5 - Math.random());
  };

  const [options, setOptions] = useState(getOptions());

  const handleAnswer = (option) => {
    if (selectedAnswer) return; // Prevent double clicking
    
    setSelectedAnswer(option);
    const correct = option === currentWord.meaning;
    setIsCorrect(correct);
    
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentIdx < words.length - 1) {
        const nextIdx = currentIdx + 1;
        setCurrentIdx(nextIdx);
        setSelectedAnswer(null);
        setIsCorrect(null);
        
        // Generate new options for the next word
        const nextWord = words[nextIdx];
        const nextWrong = words
          .filter(w => w.id !== nextWord.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(w => w.meaning);
        setOptions([...nextWrong, nextWord.meaning].sort(() => 0.5 - Math.random()));
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Test Finished!</h2>
        <p className="text-slate-500 mb-6 text-lg">Your Final Score</p>
        <div className="text-7xl font-black text-purple-600 mb-8">{score} / {words.length}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-center">
        <div className="flex justify-between items-center mb-8">
          <span className="text-slate-400 font-bold text-sm">QUESTION {currentIdx + 1}/{words.length}</span>
          <span className="text-purple-600 font-bold text-sm">SCORE: {score}</span>
        </div>

        <h2 className="text-5xl font-black text-slate-800 mb-10">{currentWord.word}</h2>

        <div className="grid gap-3">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className={`py-4 px-6 rounded-2xl font-bold text-lg border-2 transition-all text-left ${
                selectedAnswer === option
                  ? isCorrect ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-red-500 border-red-500 text-white'
                  : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-purple-300'
              } ${selectedAnswer && option === currentWord.meaning ? 'bg-emerald-500 border-emerald-500 text-white' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 2. Added the props validation correctly at the bottom
Test.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      meaning: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Test;