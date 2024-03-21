import React, { Component } from 'react';
import styles from './css/styles.module.css';
import Cell from "../Cell";

class Grid extends Component {
    renderGrid = () => {
        const result = [];
        const { data, edit, onCellClick } = this.props;
        const length = Object.values(data).length;

        for (let x = 0; x < length; x++){
            let field = [];

            for (let y= 0; y < length; y++){
                field.push(<Cell
                    key={`${x}${y}`}
                    data={data[x][y]}
                    show={edit}
                    onCellClick={() => onCellClick(data[x][y])}
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

  render() {
    return (
      <div className={styles.grid}>
        {this.renderGrid()}
      </div>
    );
  }
}

export default Grid;
