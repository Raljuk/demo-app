import React, { Component } from 'react';
import {
  calcNear,
  generateGrid,
  outBounds
} from "../../utility/grid";
import { GRID_SIZE } from "./constants";
import Grid from "../Grid";

class Game extends Component {
  state = {
    grid: generateGrid(GRID_SIZE)
  }

  reveal = (x, y) => {
    if (outBounds(x,y, Object.values(this.state.grid).length)) {
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
      grid: generateGrid(Object.values(this.state.grid).length)
    })
  }

  render() {
    const { grid } = this.state;

    console.log(grid);

    return (
        <>
          {grid && <Grid data={grid} onCellClick={this.onCellClick} /> }
        </>
    );
  }
}

export default Game;
