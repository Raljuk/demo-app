import { LeveSizes } from './levels/types';
import { Grid } from '../utility/types';
import { Mode } from './global/types';

export interface State {
  levels: {
    totalMines: LeveSizes;
    grid: Grid;
  };
  mode: Mode;
}
