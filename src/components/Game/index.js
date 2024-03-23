import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calcNear, outBounds } from '../../utility/grid';
import Grid from '../Grid';
import { getLevels } from '../../reducers/levels/selectors';
import { Status } from './types';
import styles from './css/styles.module.css';

class Game extends Component {
  cellsOpened = 0;

  state = {
    level: 0,
    grid: { ...this.props.levels[0].grid },
    status: Status.inProgress,
  };

  get gridLength() {
    return Object.values(this.state.grid).length;
  }

  reveal = (x, y, grid) => {
    if (outBounds(x, y, this.gridLength)) {
      return;
    }

    if (grid[x][y].opened) {
      return;
    }

    grid[x] = {
      ...grid[x],
      [y]: {
        ...grid[x][y],
        opened: true,
      },
    };

    this.cellsOpened++;

    if (calcNear(x, y, grid) === 0) {
      this.reveal(x - 1, y - 1, grid);
      this.reveal(x - 1, y + 1, grid);
      this.reveal(x + 1, y - 1, grid);
      this.reveal(x + 1, y + 1, grid);
      this.reveal(x - 1, y, grid);
      this.reveal(x + 1, y, grid);
      this.reveal(x, y - 1, grid);
      this.reveal(x, y + 1, grid);
    }
  };

  onCellClick = (data) => {
    const { mined, x, y } = data;
    const { status } = this.state;

    if ([Status.lose, Status.won].includes(status)) {
      return;
    }

    if (mined) {
      this.finishGame();
      return;
    }

    const grid = { ...this.state.grid };

    this.reveal(x, y, grid);
    this.setState({ grid });
    this.checkWin();
  };

  finishGame = () => {
    const { grid } = this.state;

    for (let x = 0; x < this.gridLength; x++) {
      grid[x] = { ...grid[x] };

      for (let y = 0; y < this.gridLength; y++) {
        grid[x][y] = {
          ...grid[x][y],
          opened: grid[x][y].opened || grid[x][y].mined,
        };
      }
    }

    this.setState({ grid, status: Status.lose });
  };

  restartGame = (level) => {
    this.setState({
      level,
      grid: { ...this.props.levels[level].grid },
      status: Status.inProgress,
    });

    this.cellsOpened = 0;
  };

  checkWin = () => {
    const { level } = this.state;
    const { totalMines } = this.props.levels[level];

    if (this.cellsOpened === this.gridLength * this.gridLength - totalMines) {
      this.setState({ status: Status.won });
    }
  };

  render() {
    const { grid, status, level } = this.state;
    const { levels } = this.props;

    return (
      <>
        <button onClick={() => this.restartGame(level)}>
          {status === Status.inProgress && <span>=)</span>}
          {status === Status.lose && <span>=(</span>}
          {status === Status.won && <span>=D</span>}
        </button>

        <Grid data={grid} onCellClick={this.onCellClick} />

        <select
          className={styles.select}
          onChange={(e) => this.restartGame(e.target.value)}
        >
          {levels &&
            levels.map((item, index) => (
              <option key={index} value={index}>
                Level {index + 1}
              </option>
            ))}
        </select>

        {status === Status.won && <div>Congratulations! You are winner!</div>}
        {status === Status.lose && <div>Hohoho! You are looser!</div>}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  levels: getLevels(state),
});

export default connect(mapStateToProps)(Game);
