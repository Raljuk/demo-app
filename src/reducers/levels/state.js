import { generateGrid } from '../../utility/grid';
import { LeveSizes } from './types';

export const initialState = [
  {
    totalMines: LeveSizes.first,
    grid: generateGrid(LeveSizes.first, LeveSizes.first),
  },
  {
    totalMines: LeveSizes.second,
    grid: generateGrid(LeveSizes.second, LeveSizes.second),
  },
  {
    totalMines: LeveSizes.third,
    grid: generateGrid(LeveSizes.third, LeveSizes.third),
  },
];
