import React from 'react';

interface TileProps {
  index: number;
  position: { x: number; y: number };
  onClick: () => void;
  image: string;
  size: number;
  isEmpty: boolean;
  gridSize: number;
}

const Tile: React.FC<TileProps> = ({ index, position, onClick, image, size, isEmpty, gridSize }) => {
  // Calculate background position in pixels
  const backgroundPositionX = -position.x * size;
  const backgroundPositionY = -position.y * size;

  // Calculate the total size of the background image
  const backgroundSize = `${size * gridSize}px ${size * gridSize}px`;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        backgroundImage: isEmpty ? 'none' : `url(${image})`,
        backgroundPosition: isEmpty ? 'none' : `${backgroundPositionX}px ${backgroundPositionY}px`,
        backgroundSize: backgroundSize,
        border: '1px solid black',
        cursor: isEmpty ? 'default' : 'pointer',
        backgroundColor: isEmpty ? '#fff' : 'transparent',
      }}
      onClick={onClick}
    >
      {!isEmpty && (
        <div
          style={{
            position: 'absolute',
            top: '5px',
            left: '5px',
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '3px',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {index + 1}
        </div>
      )}
    </div>
  );
};

export default Tile;
