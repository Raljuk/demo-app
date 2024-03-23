import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from '../../components/Game';
import Editor from '../../components/Editor';
import Toolbar from '../../components/Toolbar';
import { getMode } from '../../reducers/global/selectors';
import { Mode } from '../../reducers/global/types';
import { State } from '../../reducers/types';
import { HomeProps } from './types';

class Home extends Component<HomeProps> {
  render() {
    const { mode } = this.props;

    return (
      <div>
        <div>
          <Toolbar />
        </div>

        {mode === Mode.game && <Game />}

        {mode === Mode.editor && <Editor />}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  mode: getMode(state),
});

export default connect(mapStateToProps)(Home);
