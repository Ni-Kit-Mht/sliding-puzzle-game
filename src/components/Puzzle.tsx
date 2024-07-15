import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

const gridSize = 3; // 3x3 grid
const tileSize = 100; // Size of each tile in pixels

const images = [image1, image2, image3, image4, image5];

const Puzzle: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyTile, setEmptyTile] = useState<number>(gridSize * gridSize - 1);
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const initialTiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    setTiles(shuffle(initialTiles));
    setSelectedImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const isValidMove = (tileIndex: number) => {
    const emptyIndex = tiles.indexOf(emptyTile);
    const emptyX = emptyIndex % gridSize;
    const emptyY = Math.floor(emptyIndex / gridSize);
    const tileX = tileIndex % gridSize;
    const tileY = Math.floor(tileIndex / gridSize);
    return (
      (Math.abs(emptyX - tileX) === 1 && emptyY === tileY) ||
      (Math.abs(emptyY - tileY) === 1 && emptyX === tileX)
    );
  };

  const handleTileClick = (index: number) => {
    if (isValidMove(index)) {
      const newTiles = [...tiles];
      const emptyIndex = newTiles.indexOf(emptyTile);
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);

      if (isSolved(newTiles)) {
        setGameOver(true);
      }
    }
  };

  const isSolved = (tiles: number[]) => {
    return tiles.every((tile, index) => tile === index);
  };

  const resetGame = () => {
    const initialTiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    setTiles(shuffle(initialTiles));
    setEmptyTile(gridSize * gridSize - 1);
    setSelectedImage(images[Math.floor(Math.random() * images.length)]);
    setGameOver(false);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)` }}>
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            index={tile}
            position={{ x: tile % gridSize, y: Math.floor(tile / gridSize) }}
            onClick={() => handleTileClick(index)}
            image={selectedImage}
            size={tileSize}
            isEmpty={tile === emptyTile}
            gridSize={gridSize}
          />
        ))}
      </div>
      {gameOver && (
        <div style={gameOverStyle}>
          <img src={selectedImage} alt="Solved Puzzle" style={imageStyle} />
          <div style={textStyle}>Congrats</div>
          <button onClick={resetGame} style={buttonStyle}>Play Again</button>
        </div>
      )}
    </div>
  );
};

// Styles for game over screen
const gameOverStyle = {
  position: 'fixed' as 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center' as 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  padding: '20px',
  borderRadius: '10px',
  zIndex: 1000,
};

const imageStyle = {
  width: '300px',
  height: '300px',
  objectFit: 'cover' as 'cover',
};

const textStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '10px',
  marginTop: '10px',
  borderRadius: '5px',
  fontSize: '24px',
  fontWeight: 'bold',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: 'white',
};

export default Puzzle;
