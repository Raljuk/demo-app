import React, { Component } from 'react';
import styles from './css/styles.module.css';
import { generateGrid } from "../../utility/grid";
import { GRID_SIZE } from "./constants";
import Grid from "../Grid";

class Game extends Component {
  state = {
    size: GRID_SIZE,
    grid: generateGrid(GRID_SIZE, false)
  }

  onCellClick = (data) => {
    const { grid } = this.state;
    const { x, y } = data;

    grid[x][y].mined = !grid[x][y].mined;

    this.setState({
      grid: { ...grid }
    })
  }

  onFieldSizeChange = async (event) => {
    if (+event.target.value <= 99) {
      this.setState({
        size: +event.target.value
      })

      this.setState({
        grid: generateGrid(this.state.size, false)
      })
    }
  }

  saveChanges = () => {
    // this.setState({
    //   grid: generateGrid(this.state.size, false)
    // })
  }

  render() {
    const { grid, size } = this.state;

    return (
        <>

          <Grid onCellClick={this.onCellClick} data={grid} edit />

          <div className={styles.fieldSize}>
            <label>
              Fields Size&nbsp;
              <input
                type={'number'}
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

export default Game;
