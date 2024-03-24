import { Mode } from '../../reducers/global/types';
import { Grid } from '../../utility/types';

export interface EditorProps {
  addLevel: (value: { grid: Grid; totalMines: number }) => void;
  setMode: (value: Mode) => void;
}
