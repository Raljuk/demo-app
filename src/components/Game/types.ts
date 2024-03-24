import { Grid } from '@utility/types';

export enum Status {
  inProgress,
  lose,
  won,
}

export interface GameProps {
  levels: [
    {
      totalMines: number;
      grid: Grid;
    },
  ];
}
