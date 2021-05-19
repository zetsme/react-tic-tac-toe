import { useState } from 'react';
import Board from './Board';
import { calculateNextValue, calculateStatus, calculateWinner } from './utils';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentSquare = history[currentStep];

  const nextValue = calculateNextValue(currentSquare);
  const winner = calculateWinner(currentSquare);
  const status = calculateStatus(winner, currentSquare, nextValue);

  const selectSquare = (square) => {
    if (winner || currentSquare[square]) {
      return;
    }
    const newHistory = history.slice(0, currentStep + 1);
    const squaresCopy = [...currentSquare];
    squaresCopy[square] = nextValue;

    setHistory([...newHistory, squaresCopy]);
    setCurrentStep(newHistory.length);
  };

  const restart = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  };

  const moves = history.map((_, step) => {
    const desc = step === 0 ? 'Go to game start' : `Go to move #${step} `;
    const isCurrentStep = step === currentStep;
    return (
      <li key={step}>
        <button onClick={() => setCurrentStep(step)} disabled={isCurrentStep}>
          {desc} {isCurrentStep ? 'current' : null}
        </button>
      </li>
    );
  });

  return (
    <div className='game'>
      <h2>{status}</h2>
      <Board squares={currentSquare} onClick={selectSquare} />
      <button className='restart' onClick={restart}>
        Restart
      </button>
      <ol className='moves'>{moves}</ol>
    </div>
  );
};

export default App;
