import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from '../../components/Game';
import Editor from '../../components/Editor';
import Toolbar from '../../components/Toolbar';
import { getMode } from '../../reducers/global/selectors';
import { Mode } from '../../reducers/global/types';

class Home extends Component {
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

const mapStateToProps = (state) => ({
  mode: getMode(state),
});

export default connect(mapStateToProps)(Home);
