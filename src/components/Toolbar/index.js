import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMode } from '../../reducers/global/actions';
import { getMode } from '../../reducers/global/selectors';
import { Mode } from '../../reducers/global/types';
import styles from './css/styles.module.css';

class Toolbar extends Component {
  onModeChange(mode) {
    const { dispatch } = this.props;

    dispatch(setMode(mode));
  }
  render() {
    const { mode } = this.props;

    return (
      <form className={styles.toolbar}>
        <div className="radio">
          <label>
            <input
              type="radio"
              checked={mode === Mode.game}
              onChange={() => this.onModeChange(Mode.game)}
            />
            Game
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              checked={mode === Mode.editor}
              onChange={() => this.onModeChange(Mode.editor)}
            />
            Level Editor
          </label>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  mode: getMode(state),
});

export default connect(mapStateToProps)(Toolbar);
