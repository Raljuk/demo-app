import { CellData } from '@utility/types';
import { Mode } from '@reducers/global/types';

export enum Colors {
  red = 1,
  green,
  blue,
  browne,
  orange,
  yellow,
  black,
  grey,
}

export interface CellProps {
  data: CellData;
  mode: Mode;
  onCellClick: () => void;
}
