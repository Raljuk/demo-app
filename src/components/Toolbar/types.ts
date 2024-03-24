import { Mode } from '../../reducers/global/types';

export interface ToolbarProps {
  mode: Mode;
  setMode: (value: Mode) => {};
}
