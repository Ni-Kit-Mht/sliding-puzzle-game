import React from 'react';
import Puzzle from './components/Puzzle';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sliding Puzzle Game</h1>
      <Puzzle />
    </div>
  );
};

export default App;
