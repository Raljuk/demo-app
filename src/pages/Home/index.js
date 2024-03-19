import React, { Component } from 'react';
import styles from './css/styles.css';
import Game from "../../components/Game";

class Home extends Component {
  render() {
    return (
      <div className={styles.FAQ}>
        <Game/>
      </div>
    );
  }
}

export default Home;
