import { Mode } from '../../reducers/global/types';

export interface ToolbarProps {
  mode: Mode;
  dispatch: (value: { type: string; text: any }) => {};
}
