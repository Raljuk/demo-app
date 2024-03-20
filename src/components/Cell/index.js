import React, { Component } from 'react';
import cx from 'classnames';
import styles from './css/styles.module.css';

class Cell extends Component {
  render() {
    const { data, onCellClick } = this.props;
    const { mined, opened, near } = data;

    return (
        <div
            className={cx(styles.cell, {
              [styles.mined]: mined,
              [styles.opened]: opened,
            })}
            onClick={onCellClick}>
          {opened && near > 0 ? near : ''}
        </div>
    );
  }
}

export default Cell;
