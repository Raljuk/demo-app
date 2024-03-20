import React, { Component } from 'react';
import styles from './css/styles.module.css';
import Cell from "../Cell";
import {
  calcNear,
  generateRandomGrid,
  outBounds
} from "../../utility/grid";
import { GRID_SIZE } from "./constants";

class Game extends Component {
  state = {
    gridSize: GRID_SIZE,
    grid: generateRandomGrid(GRID_SIZE)
  }

  reveal = (x, y) => {
    if (outBounds(x,y, this.state.gridSize)) {
      return;
    }

    const { grid } = this.state;
    const cell = grid[x][y];

    if (cell.opened) {
      return;
    }

    cell.opened = true;

    this.setState({
      grid:  { ...grid }
    })

    if(calcNear(x, y, grid) === 0) {
      this.reveal(x - 1,y - 1);
      this.reveal(x - 1,y + 1);
      this.reveal(x + 1,y - 1);
      this.reveal(x + 1,y + 1);
      this.reveal(x - 1, y);
      this.reveal(x + 1, y);
      this.reveal(x,y - 1);
      this.reveal(x,y + 1);
    }
  }

  onCellClick = (data) => {
    const { mined, x, y } = data;

    if (mined) {
      alert('BOOM!');
      this.finishGame();
      return;
    }

    this.reveal(x, y);
  }

  finishGame = () => {
    this.setState({
      grid: generateRandomGrid(this.state.gridSize)
    })
  }

  renderGrid = () => {
    const result = [];
    const { grid } = this.state;

    for(let x = 0; x < this.state.gridSize; x++){
      let field = [];

      for(let y=0; y < this.state.gridSize; y++){
        field.push(<Cell
            key={`${x}${y}`}
            data={grid[x][y]}
            onCellClick={() => this.onCellClick(grid[x][y])}
        />);
      }

      result.push(
          <div
              key={`${x}`}
              className={styles.field}>
            {field}
          </div>
      );
    }

    return result;
  }

  onFieldSizeChange = (event) => {
    console.log(+event.target.value)

    this.setState({
      gridSize: +event.target.value,
      grid: generateRandomGrid(+event.target.value)
    })
  }

  render() {
    const { editorMode } = this.props;

    return (
        <>
          <div className={styles.grid}>
            {this.renderGrid()}
          </div>

          {editorMode && (
              <div className={styles.fieldSize}>
                <label>
                  Fields Size
                  <input type={'number'} onChange={this.onFieldSizeChange} />
                </label>
              </div>
          )}
        </>
    );
  }
}

export default Game;
