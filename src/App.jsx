import { useState } from 'react';
import { day1Data } from './data/day1';
import { day2Data } from './data/day2';
import { day3Data } from './data/day3'; // Import Day 2
import { day4Data } from './data/day4';
import { day5Data } from './data/day5';
import { day6Data } from './data/day6';
import { day7Data } from './data/day7';
import { day8Data } from './data/day8';
import { day9Data } from './data/day9';
import { day10Data } from './data/day10';
import Memorize from './components/Memorize';
import Match from './components/Match';
import Test from './components/Test';

function App() {
  const [stage, setStage] = useState('menu');
  const [selectedDay, setSelectedDay] = useState(null);

  // Combine data into an easy lookup object
  const allData = {
    1: day1Data,
    2: day2Data,
    3: day3Data,
    4: day4Data,
    5: day5Data,
    6: day6Data,
    7: day7Data,
    8: day8Data,
    9: day9Data,
    10: day10Data
  };

  // 1. Initial Screen: Pick your Day
  if (!selectedDay) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black text-slate-800 mb-8">TOPIK 30 DAYS</h1>
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((day) => (
            <button 
              key={day}
              onClick={() => setSelectedDay(day)}
              className="bg-white border-2 border-slate-200 p-8 rounded-3xl shadow-sm font-bold text-2xl hover:border-blue-500 hover:text-blue-600 transition"
            >
              Day {day}
            </button>
          ))}
          <div className="col-span-2 text-center text-slate-400 font-medium p-4 italic">
            Day 3-30 Coming Soon...
          </div>
        </div>
      </div>
    );
  }

  // 2. Secondary Menu: Pick your Study Mode
  if (stage === 'menu') {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
        <button onClick={() => setSelectedDay(null)} className="mb-8 text-slate-400 font-bold">
          ← Back to Day Selection
        </button>
        <h2 className="text-3xl font-black text-slate-800 mb-8 tracking-tighter text-center">
          DAY {selectedDay} STUDY
        </h2>
        <div className="grid gap-4 w-full max-w-sm">
          <button onClick={() => setStage('memorize')} className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg font-bold text-xl hover:bg-blue-700 active:scale-95 transition">
            1. Memorize Card
          </button>
          <button onClick={() => setStage('match')} className="bg-emerald-500 text-white p-6 rounded-2xl shadow-lg font-bold text-xl hover:bg-emerald-600 active:scale-95 transition">
            2. Comparison Match
          </button>
          <button onClick={() => setStage('test')} className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg font-bold text-xl hover:bg-purple-700 active:scale-95 transition">
            3. Final Test
          </button>
        </div>
      </div>
    );
  }

  // 3. The Study Modes
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-xl mx-auto">
        <button onClick={() => setStage('menu')} className="mb-6 text-slate-400 font-bold flex items-center hover:text-slate-800 transition">
          ← Back to Section Menu
        </button>
        
        {stage === 'memorize' && <Memorize words={allData[selectedDay]} />}
        {stage === 'match' && <Match words={allData[selectedDay]} />}
        {stage === 'test' && <Test words={allData[selectedDay]} />}
      </div>
    </div>
  );
}

export default App;