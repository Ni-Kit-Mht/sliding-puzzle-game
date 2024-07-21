import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { _cs } from '@togglecorp/fujs';

import Button from '../../components/Button';

import RawButton from '../../components/RawButton';
import configContext, { GameState, GridSize } from '../../contexts/config';
import { puzzleImages } from '../../utils/constants';

import styles from './styles.module.css';
import { Link } from 'react-router-dom';

const gridOptions: { key: GridSize, label: string }[] = [
  { key: 3, label: '3x3' },
  { key: 4, label: '4x4' },
  { key: 5, label: '5x5' },
];

function InitialScreen() {
  const {
    imageSrc,
    setImageSrc,
    gridSize,
    setGridSize,
    setGameState
  } = useContext(configContext);

  return (
    <div className={styles.initialScreen}>
      <nav className={styles.nav}>
        <Link to="settings">
          <FontAwesomeIcon icon={faGear} className={styles.icon} />
          Settings
        </Link>
      </nav>
      
      <div className={styles.brand}>
        <h1>Sliding Puzzle Game</h1>
      </div>
      
      <div className={styles.imageSelection}>
        <div className={styles.label}>
          Select an image:
        </div>
        <div className={styles.imageList}>
          {puzzleImages.map((puzzleImage) => (
            <RawButton
              key={puzzleImage.key}
              name={puzzleImage.src}
              onClick={setImageSrc}
              className={_cs(styles.imageButton, imageSrc === puzzleImage.src && styles.selected)}
            >
              <img
                className={styles.tileImage}
                src={puzzleImage.src}
              />
            </RawButton>
          ))}
        </div>
      </div>
      <div className={styles.gridSelection}>
        <div className={styles.label}>
          Select Level:
        </div>
        <div className={styles.gridList}>
          {gridOptions.map((gridOption) => (
            <RawButton
              key={gridOption.key}
              className={_cs(styles.gridSelectionButton, gridSize === gridOption.key && styles.selected)}
              name={gridOption.key}
              onClick={setGridSize}
            >
              {gridOption.label}
            </RawButton>
          ))}
        </div>
      </div>
      <div>
        <Link to="game">
            Start Game
        </Link>
      </div>
    </div>
  );
};

export default InitialScreen;
