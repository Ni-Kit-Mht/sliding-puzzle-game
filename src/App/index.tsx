import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styles from './styles.module.css';
import InitialScreen from '../views/InitialScreen';
import configContext, { ConfigContextProps, GameState, GridSize } from '../contexts/config';
import { DEFAULT_PUZZLE_IMAGE_SRC } from '../utils/constants';
import Settings from '../views/Settings';
import Game from '../views/Game';


function App() {
  const [gameState, setGameState] = useState<GameState>('initial');
  const [imageSrc, setImageSrc] = useState<string>(DEFAULT_PUZZLE_IMAGE_SRC);
  const [gridSize, setGridSize] = useState<GridSize>(3);
  
  const configContextValue = useMemo<ConfigContextProps>(() => ({
    imageSrc,
    setImageSrc,
    gridSize,
    setGridSize,
    gameState,
    setGameState,
  }), [imageSrc, gridSize, gameState]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <configContext.Provider value={configContextValue}>
            <Routes>
              <Route path="/" element={<InitialScreen />} />
              <Route path="/game" element={<Game />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
        </configContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
