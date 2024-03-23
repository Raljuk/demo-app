import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { GRID_SIZE, MAX_SIZE, MIN_SIZE, NUMBER, TIMEOUT } from './constants';
import Grid from '../Grid';
import { generateGrid, setNear } from '../../utility/grid';
import { addLevel } from '../../reducers/levels/actions';
import { setMode } from '../../reducers/global/actions';
import { Mode } from '../../reducers/global/types';
import styles from './css/styles.module.css';
import { CellData } from '../../utility/types';
import { EditorProps } from './types';

class Editor extends Component<EditorProps> {
  state = {
    size: GRID_SIZE,
    level: {
      totalMines: 0,
      grid: generateGrid(GRID_SIZE),
    },
  };

  timeoutID: null | number = 0;

  onCellClick = (data: CellData): void => {
    const { grid, totalMines } = this.state.level;
    const { x, y } = data;

    this.setState({
      level: {
        totalMines: totalMines + 1,
        grid: {
          ...grid,
          [x]: {
            ...grid[x],
            [y]: {
              ...grid[x][y],
              mined: !grid[x][y].mined,
            },
          },
        },
      },
    });
  };

  onFieldSizeChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    let size = +(event.target as HTMLInputElement).value;
    size = size <= MAX_SIZE ? size : MAX_SIZE;

    this.setState({ size });

    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
      this.timeoutID = null;
    }

    this.timeoutID = +setTimeout(() => {
      this.setState({
        level: {
          totalMines: 0,
          grid: generateGrid(size),
        },
      });
    }, TIMEOUT);
  };

  saveChanges = (): void => {
    const { dispatch } = this.props;
    const { grid, totalMines } = this.state.level;

    setNear(grid);

    dispatch(
      addLevel({
        grid,
        totalMines,
      })
    );

    dispatch(setMode(Mode.game));
  };

  render() {
    const { level, size } = this.state;

    return (
      <>
        <Grid onCellClick={this.onCellClick} data={level.grid} />

        <div className={styles.fieldSize}>
          <label>
            Fields Size&nbsp;
            <input
              className={styles.sizeInput}
              type={NUMBER}
              value={size}
              onChange={(event) => this.onFieldSizeChange(event)}
              min={MIN_SIZE}
              max={MAX_SIZE}
            />
          </label>
        </div>

        <button className={styles.saveButton} onClick={this.saveChanges}>
          Save
        </button>
      </>
    );
  }
}

export default connect()(Editor);
