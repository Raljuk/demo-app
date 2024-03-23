import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GRID_SIZE, MAX_SIZE, NUMBER, TIMEOUT } from './constants';
import Grid from '../Grid';
import { generateGrid, setNear } from '../../utility/grid';
import { addLevel } from '../../reducers/levels/actions';
import { setMode } from '../../reducers/global/actions';
import { Mode } from '../../reducers/global/types';
import styles from './css/styles.module.css';

class Editor extends Component {
  state = {
    size: GRID_SIZE,
    level: {
      totalMines: 0,
      grid: generateGrid(GRID_SIZE),
    },
  };

  onCellClick = (data) => {
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

  onFieldSizeChange = async (event) => {
    const size = +event.target.value;

    this.setState({ size });

    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
      this.timeoutID = null;
    }

    this.timeoutID = setTimeout(() => {
      if (size <= MAX_SIZE) {
        this.setState({
          level: {
            totalMines: 0,
            grid: generateGrid(size),
          },
        });
      }
    }, TIMEOUT);
  };

  saveChanges = () => {
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
              type={NUMBER}
              value={size}
              onChange={this.onFieldSizeChange}
              min={2}
              max={99}
            />
          </label>
        </div>

        <button onClick={this.saveChanges}>Save</button>
      </>
    );
  }
}

export default connect()(Editor);
