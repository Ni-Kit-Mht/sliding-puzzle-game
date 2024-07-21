import abstractDoughnutImage from '../assets/images/abstract-doughnut.jpg';
import beachImage from '../assets/images/beach.jpg';
import birdImage from '../assets/images/bird.jpg';
import desertImage from '../assets/images/desert.jpg';
import jellyfishImage from '../assets/images/jellyfish.jpg'

export const puzzleImages: {
    key: string;
    label: string;
    src: string;
}[] = [
    {
        key: 'abstractDoughnut',
        label: 'Abstract Doughnut',
        src: abstractDoughnutImage,
    },
    {
        key: 'beach',
        label: 'Beach',
        src: beachImage,
    },
];

export const DEFAULT_PUZZLE_IMAGE_SRC = abstractDoughnutImage;

