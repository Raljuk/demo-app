import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { getMode } from '../../reducers/global/selectors';
import { Mode } from '../../reducers/global/types';
import styles from './css/styles.module.css';
import { Colors, CellProps } from './types';
import { State } from '../../reducers/types';

class Cell extends Component<CellProps> {
  render() {
    const { data, onCellClick, mode } = this.props;
    const { mined, opened, near } = data;

    return (
      <div
        className={cx(styles.cell, {
          [styles.mined]: (mode === Mode.editor || opened) && mined,
          [styles.opened]: opened,
        })}
        onClick={onCellClick}
      >
        {opened && !mined && near > 0 && (
          <span style={{ color: Colors[near] }}>{near}</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  mode: getMode(state),
});

export default connect(mapStateToProps)(Cell);
