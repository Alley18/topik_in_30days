import { useState } from 'react';
import PropTypes from 'prop-types';


const Memorize = ({ words }) => {
  const [index, setIndex] = useState(0);
  const current = words[index];

  // If for some reason words aren't loading, show a message
  if (!words || words.length === 0) return <div>Loading words...</div>;

  return (
    <div className="flex flex-col items-center">
      {/* THE CARD */}
      <div className="w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-center mb-6 min-h-[400px] flex flex-col justify-center">
        
        {/* Progress Tracker */}
        <p className="text-blue-500 font-bold mb-4 uppercase tracking-widest text-xs">
          Word {index + 1} of {words.length}
        </p>

        {/* The Korean Word */}
        <h2 className="text-6xl font-black text-slate-800 mb-2">
          {current.word}
        </h2>
        
        {/* Reading/Pronunciation */}
        <p className="text-slate-400 italic mb-8 text-xl">
          {current.reading}
        </p>
        
        {/* Sentence Box */}
        <div className="bg-slate-50 p-6 rounded-2xl mb-6 text-left border-l-4 border-blue-500">
          <p className="text-lg text-slate-700 font-medium leading-relaxed">
            {current.sentence}
          </p>
          <p className="text-sm text-slate-500 mt-2 italic">
            {current.translation}
          </p>
        </div>

        {/* Meaning Box */}
        <div className="bg-blue-600 text-white py-4 rounded-xl shadow-md">
          <p className="text-2xl font-bold uppercase tracking-tight">
            {current.meaning}
          </p>
        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="flex gap-4 w-full max-w-md">
        <button 
          onClick={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          className="flex-1 bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-300 disabled:opacity-30 transition-all"
        >
          Previous
        </button>
        
        <button 
          onClick={() => setIndex(Math.min(words.length - 1, index + 1))}
          disabled={index === words.length - 1}
          className="flex-1 bg-slate-800 text-white font-bold py-4 rounded-2xl hover:bg-slate-700 disabled:opacity-30 transition-all shadow-lg"
        >
          {index === words.length - 1 ? "Finished!" : "Next Word"}
        </button>
      </div>
    </div>
  );
};

Memorize.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      reading: PropTypes.string.isRequired,
      sentence: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired,
      meaning: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Memorize;