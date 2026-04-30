import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const Match = ({ words }) => {
  const [pairs, setPairs] = useState([]);
  const [selectedKorean, setSelectedKorean] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [completed, setCompleted] = useState([]);

  // Setup a round of 5 random words
  const startNewRound = () => {
    const shuffled = [...words].sort(() => 0.5 - Math.random()).slice(0, 5);
    setPairs(shuffled);
    setCompleted([]);
    setSelectedKorean(null);
    setSelectedEnglish(null);
  };

  useEffect(() => {
    startNewRound();
  }, [words]);

  // Check if selection is a match
  useEffect(() => {
    if (selectedKorean && selectedEnglish) {
      if (selectedKorean.id === selectedEnglish.id) {
        setCompleted([...completed, selectedKorean.id]);
        setSelectedKorean(null);
        setSelectedEnglish(null);
      } else {
        // Reset after a short delay if wrong
        setTimeout(() => {
          setSelectedKorean(null);
          setSelectedEnglish(null);
        }, 500);
      }
    }
  }, [selectedKorean, selectedEnglish]);

  const koreanWords = [...pairs].sort((a, b) => a.word.localeCompare(b.word));
  const englishWords = [...pairs].sort((a, b) => a.meaning.localeCompare(b.meaning));

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200 w-full mb-6">
        <h3 className="text-center font-bold text-slate-400 mb-6 uppercase tracking-widest text-sm">Match the Pairs</h3>
        
        <div className="flex gap-4">
          {/* Korean Column */}
          <div className="flex-1 flex flex-col gap-3">
            {koreanWords.map((item) => (
              <button
                key={item.id}
                onClick={() => !completed.includes(item.id) && setSelectedKorean(item)}
                className={`p-4 rounded-xl font-bold text-lg border-2 transition-all ${
                  completed.includes(item.id) ? 'bg-emerald-100 border-emerald-500 text-emerald-700 opacity-50' :
                  selectedKorean?.id === item.id ? 'border-blue-500 bg-blue-50 text-blue-600 scale-105' : 'border-slate-100 bg-slate-50 text-slate-700'
                }`}
              >
                {item.word}
              </button>
            ))}
          </div>

          {/* English Column */}
          <div className="flex-1 flex flex-col gap-3">
            {englishWords.map((item) => (
              <button
                key={item.id}
                onClick={() => !completed.includes(item.id) && setSelectedEnglish(item)}
                className={`p-4 rounded-xl font-bold text-sm border-2 transition-all ${
                  completed.includes(item.id) ? 'bg-emerald-100 border-emerald-500 text-emerald-700 opacity-50' :
                  selectedEnglish?.id === item.id ? 'border-blue-500 bg-blue-50 text-blue-600 scale-105' : 'border-slate-100 bg-slate-50 text-slate-700'
                }`}
              >
                {item.meaning}
              </button>
            ))}
          </div>
        </div>

        {completed.length === 5 && (
          <button 
            onClick={startNewRound}
            className="w-full mt-8 bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-emerald-600 transition-all"
          >
            Great Job! Next 5 Words
          </button>
        )}
      </div>
    </div>
  );
};

Match.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      meaning: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Match;