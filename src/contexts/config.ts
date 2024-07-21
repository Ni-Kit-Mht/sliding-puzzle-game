import { createContext } from "react";
import { DEFAULT_PUZZLE_IMAGE_SRC } from "../utils/constants";

type SetFn<T> = React.Dispatch<React.SetStateAction<T>>;

export type GridSize = 3 | 4 | 5;
export type GameState = 'initial' | 'game' | 'endGame' | 'settings';

export interface ConfigContextProps {
    imageSrc: string;
    setImageSrc: SetFn<string>;

    gridSize: GridSize;
    setGridSize: SetFn<GridSize>;
    
    gameState: GameState;
    setGameState: SetFn<GameState>;
    
    /*
    playBackgroundMusic: boolean;
    setPlayBackgroundMusic: SetFn<boolean>;

    playEffectAudio: boolean;
    setPlayEffectAudio: SetFn<boolean>;
    */
}

function getDefaultSetter(valueName: string) {
    return () => {
        console.error(`configContext::${valueName} was called without a provider`);
    }
}

const configContext = createContext<ConfigContextProps>({
    imageSrc: DEFAULT_PUZZLE_IMAGE_SRC,
    setImageSrc: getDefaultSetter('imageSrc'),

    gridSize: 3,
    setGridSize: getDefaultSetter('gridSize'),
    
    gameState: 'initial',
    setGameState: getDefaultSetter('gameState'),
});

export default configContext;