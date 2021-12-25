import React, { Component } from "react";

import "../styles/Choose.css";

class Choose extends Component {
  constructor(props) {
    super(props);
    // this.clearLocalStorage = this.clearLocalStorage.bind(this);
  }

  componentDidMount() {
    console.log(this.state)
  }

  render() {
    return (
      <div id="chooseBox">
        <h2>{JSON.stringify(this.state)}</h2>
        <div className="member">
          <img src="https://i.ibb.co/VSvZXWQ/artleo-com-180532.jpg" height="300px" />
        </div>
        <span>VS</span>
        <div className="member">
          <img src="img/2.jpg" height="300px" />
        </div>
      </div>
    );
  }
}

export default Choose;
