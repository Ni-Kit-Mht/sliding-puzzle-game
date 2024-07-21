import React, { useCallback, useContext, useMemo, useState } from "react";
import { _cs } from "@togglecorp/fujs";

import configContext from "../../contexts/config";
import RawButton from "../../components/RawButton";
import styles from './styles.module.css';

interface GridElement {
    key: number;
    column: number;
    row: number;
    imageRow: number;
    imageColumn: number;
}

function isMovableGridElement(gridElement: GridElement, emptySpace: GridElement) {
    return (gridElement.column === emptySpace.column && (gridElement.row === (emptySpace.row + 1) || gridElement.row === (emptySpace.row - 1)))
        || (gridElement.row === emptySpace.row && (gridElement.column === (emptySpace.column + 1) || gridElement.column === (emptySpace.column - 1)));
}

function isInSameSpace(a: GridElement, b: GridElement) {
    return a.row === b.row && a.column === b.column;
}

function getGridElements(gridSize: number, emptySpace: GridElement): GridElement[] {
    const rows = Array.from(new Array(gridSize).keys());
    const gridElements = rows.map((row) => {
        const columns = Array.from(new Array(gridSize).keys());

        return columns.map((column) => ({
            key: row * gridSize + column,
            row,
            imageRow: row,
            column,
            imageColumn: column,
        }));
    }).flat();
    
    const emptySpaceIndex = gridElements.findIndex((el) => isInSameSpace(el, emptySpace));
    if (emptySpaceIndex !== -1) {
        gridElements.splice(emptySpaceIndex, 1);
    }
    
    return gridElements;
}

function Game() {
    const {
        imageSrc,
        gridSize,
    } = useContext(configContext);

    const [emptySpace, setEmptySpace] = useState<GridElement>({
        key: -1,
        column: gridSize - 1,
        row: gridSize - 1,
        imageRow: -1,
        imageColumn: -1,
    });
    const [gridElements, setGridElements] = useState<GridElement[]>(() => getGridElements(gridSize, emptySpace));
    
    const handleGridElementClick = useCallback((clickedGridElement: GridElement) => {
        setGridElements((prevGridElements) => {
            const index = prevGridElements.findIndex((gridElement) => gridElement.key === clickedGridElement.key );
            if (index === -1) {
                return prevGridElements;
            }
            const newGridElement = {
                ...clickedGridElement,
                row: emptySpace.row,
                column: emptySpace.column,
            };
            
            const newGridElements = [...prevGridElements];
            newGridElements.splice(index, 1, newGridElement);
            
            setEmptySpace({
                ...emptySpace,
                row: clickedGridElement.row,
                column: clickedGridElement.column,
            })
            return newGridElements;
        });
    }, [emptySpace]);
    
    return (
        <div className={styles.game}>
            <div
                className={styles.grid}
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}
            >
                {gridElements.map((gridElement) => {
                    if (isInSameSpace(gridElement, emptySpace)) {
                        return null;
                    }

                    const { key, row, column, imageRow, imageColumn } = gridElement;
                    const isMovable = isMovableGridElement(gridElement, emptySpace);
                    
                    return (
                        <RawButton
                            key={key}
                            name={gridElement}
                            className={_cs(styles.gridElement, isMovable && styles.movable)}
                            disabled={!isMovable}
                            style={{
                                left: `${100 * (column / gridSize)}%`,
                                top: `${100 * (row / gridSize)}%`,
                                width: `${100 / gridSize}%`,
                                height: `${100 / gridSize}%`,
                            }}
                            onClick={handleGridElementClick}
                        >
                            <img
                                className={styles.image}
                                src={imageSrc}
                                style={{
                                    transform: `translate(-${100 * (imageColumn / gridSize)}%, -${100 * (imageRow / gridSize)}%)`,
                                }}
                            />
                            {key + 1}
                        </RawButton>
                    );
                })}
            </div>
        </div>
    );
}

export default Game;