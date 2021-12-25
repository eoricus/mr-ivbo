import React, { Component } from "react";
import Header from "./Header.js";
import regeneratorRuntime from "regenerator-runtime";

import "../styles/App.css";

function randomNumber(m, n) {
  return Math.floor(Math.random() * (n - m + 1)) + m;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstId: randomNumber(1, 28),
      first: {},
      secondId: randomNumber(1, 28),
      second: {},
      rateForA: -1,
      rateForB: -1,
      token: 0,
      top3: [],
    };
    while (this.state.first == this.state.second) {
      this.setState({ second: randomNumber(1, 28) });
    }

    this.memberOnClick = this.memberOnClick.bind(this);
  }

  memberOnClick(first) {
    let score1 = this.state.first.score,
      score2 = this.state.second.score;

    let newRateForFirst, newRateForSecond;
    if (first) {
      newRateForFirst = score1 + score2 * 0.1;
      newRateForSecond = score2 * 0.9;
    } else {
      newRateForFirst = score1 * 0.9;
      newRateForSecond = score2 + score1 * 0.1;
    }

    fetch(
      `http://localhost:80/changeScore?id=${this.state.firstId}&score=${newRateForFirst}`
    ).then((res) => res.json());
    fetch(
      `http://localhost:80/changeScore?id=${this.state.secondId}&score=${newRateForSecond}`
    ).then((res) => res.json());
    fetch(
      `http://localhost:80/newCompetition?FirstId=${
        this.state.firstId
      }&SecondId=${this.state.secondId}&Winner=${
        first ? this.state.firstId : this.state.secondId
      }&token=${this.state.token}`
    ).then((res) => res.json());

    window.location.reload();
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token === null) {
      localStorage.setItem("Token", Math.random().toString(36).substr(2));
    }
    this.setState({ token: localStorage.getItem("token") });

    fetch(`http://localhost:80/member?id=${this.state.firstId}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({ first: result });
      });
    fetch(`http://localhost:80/member?id=${this.state.secondId}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({ second: result });
      });
    fetch(`http://localhost:80/top3`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({ top3: result });
        console.log(result);
      });

    document.getElementById("first").addEventListener("click", () => {
      this.memberOnClick(true);
    });
    document.getElementById("second").addEventListener("click", () => {
      this.memberOnClick(false);
    });
    document.addEventListener("keydown", function (event) {
      console.log(event);
      if (event.code == "ArrowRight" || event.code == "ArrowLeft") {
        let event = new Event("click");
        if (event.code == "ArrowRight") {
          document.getElementById("second").dispatchEvent(event);
        } else {
          document.getElementById("first").dispatchEvent(event);
        }
      }
    });
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <span id="ip"></span>
          <div id="chooseBox">
            <h2>Кто красивей?</h2>
            <div id="members">
              <div className="member" id="first">
                <img src={this.state.first.photoURL} height="250px" />
                <span>
                  {this.state.first.name} ({this.state.first.score})
                </span>
              </div>
              <div className="member">VS</div>
              <div className="member" id="second">
                <img src={this.state.second.photoURL} height="250px" />
                <span>
                  {this.state.second.name} ({this.state.second.score})
                </span>
              </div>
            </div>
          </div>
          {this.state.top3[0] && this.state.top3[1] && this.state.top3[2] ? (
            <div id="top3">
              <span>Топ 3:</span>
              <div className="member" id="silver">
                <img src={this.state.top3[1].photoURL} width="50px" />
                <span>
                  {this.state.top3[1].name} ({this.state.top3[1].score})
                </span>
              </div>
              <div className="member" id="gold">
                <img src={this.state.top3[0].photoURL} width="50px" />
                <span>
                  {this.state.top3[0].name} ({this.state.top3[0].score})
                </span>
              </div>
              <div className="member" id="bronze">
                <img src={this.state.top3[2].photoURL} width="50px" />
                <span>
                  {this.state.top3[2].name} ({this.state.top3[2].score})
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </main>
      </>
    );
  }
}

export default App;
