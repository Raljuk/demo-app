import React, { Component } from 'react';
import cx from 'classnames';
import styles from './css/styles.module.css';

class Cell extends Component {
  onCellClick = () => {
    const { x, y } = this.props.data;

    if (this.props.data.mined) {
      alert('BOOM!');
      return;
    }

    this.props.onCellClick(x, y);
  }

  render() {
    const { mined, opened, near } = this.props.data;

    return (
        <div
            className={cx(styles.cell, {
              [styles.mined]: mined,
              [styles.opened]: opened,
            })}
            onClick={this.onCellClick}>
          {opened && near > 0 ? near : ''}
        </div>
    );
  }
}

export default Cell;
