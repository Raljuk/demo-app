import React, { Component } from 'react';
import styles from './css/styles.css';
import Game from "../../components/Game";

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
      <div className={styles.FAQ}>
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
        <Game editorMode={editorMode}/>
      </div>
    );
  }
}

export default Home;
