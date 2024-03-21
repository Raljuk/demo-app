import React, { Component } from 'react';
import styles from './css/styles.css';
import Game from "../../components/Game";
import Editor from "../../components/Editor";

class Home extends Component {
  state = {
    editorMode: false
  }

  handleOptionChange(editorMode) {
    this.setState({
      editorMode,
    });
  }

  render() {
    const { editorMode } = this.state;

    return (
      <div>
        <div>
          <form>
            <div className="radio">
              <label>
                <input type="radio"  checked={!editorMode} onChange={() => this.handleOptionChange(false)} />
                Game
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" checked={editorMode} onChange={() => this.handleOptionChange(true)} />
                Level Editor
              </label>
            </div>
          </form>
        </div>

        {!editorMode && <Game/>}

        {editorMode && <Editor/>}

      </div>
    );
  }
}

export default Home;
