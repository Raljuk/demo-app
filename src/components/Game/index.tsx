import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calcNear, isOutBounds } from '@utility/grid';
import { CellData, Grid as GridType } from '@utility/types';
import { getLevels } from '@reducers/levels/selectors';
import { State } from '@reducers/types';
import { GameProps, Status } from './types';
import Grid from '../Grid';
import styles from './css/styles.module.css';

class Game extends Component<GameProps> {
  cellsOpened = 0;

  state = {
    level: 0,
    grid: { ...this.props.levels[0].grid },
    status: Status.inProgress,
  };

  get gridLength(): number {
    return Object.values(this.state.grid).length;
  }

  reveal = (startX: number, startY: number, grid: GridType): void => {
    const stack: { x: number; y: number }[] = [{ x: startX, y: startY }];

    while (stack.length > 0) {
      const { x, y } = stack.pop()!;

      if (isOutBounds(x, y, this.gridLength) || grid[x][y].opened) {
        continue;
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
        const directions = [
          { dx: -1, dy: -1 },
          { dx: -1, dy: 1 },
          { dx: 1, dy: -1 },
          { dx: 1, dy: 1 },
          { dx: -1, dy: 0 },
          { dx: 1, dy: 0 },
          { dx: 0, dy: -1 },
          { dx: 0, dy: 1 },
        ];

        for (const direction of directions) {
          const newX = x + direction.dx;
          const newY = y + direction.dy;

          stack.push({ x: newX, y: newY });
        }
      }
    }
  };

  onCellClick = (data: CellData): void => {
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

  finishGame = (): void => {
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

  restartGame = (level: number): void => {
    this.setState({
      level,
      grid: { ...this.props.levels[level].grid },
      status: Status.inProgress,
    });

    this.cellsOpened = 0;
  };

  checkWin = (): void => {
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
        <button
          className={styles.restartGameButton}
          onClick={() => this.restartGame(level)}
        >
          {status === Status.inProgress && <span>=)</span>}
          {status === Status.lose && <span>=(</span>}
          {status === Status.won && <span>=D</span>}
        </button>

        <Grid data={grid} onCellClick={this.onCellClick} />

        <select
          className={styles.select}
          onChange={(e) => this.restartGame(+e.target.value)}
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

const mapStateToProps = (state: State) => ({
  levels: getLevels(state),
});

export default connect(mapStateToProps)(Game);
