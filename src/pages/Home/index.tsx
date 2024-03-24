import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from '@components/Game';
import Editor from '@components/Editor';
import Toolbar from '@components/Toolbar';
import { getMode } from '@reducers/global/selectors';
import { Mode } from '@reducers/global/types';
import { State } from '@reducers/types';
import { HomeProps } from './types';
import { fetchLevels } from '@reducers/levels/actions';

class Home extends Component<HomeProps> {
  componentDidMount() {
    const { fetchLevels } = this.props;

    fetchLevels();
  }

  render() {
    const { mode } = this.props;

    return (
      <>
        <div>
          <Toolbar />
        </div>

        {mode === Mode.game && <Game />}

        {mode === Mode.editor && <Editor />}
      </>
    );
  }
}

const mapStateToProps = (state: State) => ({
  mode: getMode(state),
});

const mapDispatchToProps = {
  fetchLevels: fetchLevels,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
