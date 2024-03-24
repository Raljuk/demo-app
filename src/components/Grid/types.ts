import { CellData, Grid } from '@utility/types';

export interface GridProps {
  data: Grid;
  onCellClick: (value: CellData) => void;
}
