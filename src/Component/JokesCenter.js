// All the logic done by me and its working fine but when i see video i realize my mentor is doing it in better way
// 1.In my code in every loop joke is called and added to array which is causing rendering 10 times but colt made an array put all 10 jokes in them and then set the state so all jokes are shown simultaneously
import React, { Component } from "react";
import axios from "axios";
import "./JokesCenter.css";

class JokesCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      isLoading: true,
    };
    // this.upVoteClick = this.upVoteClick.bind(this);
    // this.downVoteClick = this.downVoteClick.bind(this);
    console.log("in constructor 1");
  }
  upVoteClick(index) {
    console.log("upvoted", index);
    // this.setState({
    //   jokes: this.state.jokes[index].score + 1,
    // });
  }
  //   downVoteClick() {
  //     console.log("downVoted");
  //     this.setState({
  //       jokes: this.state.jokes.score - 1,
  //     });
  //   }
  async componentDidMount() {
    console.log("mount 3");
    let response;

    for (let i = 0; i < 10; i++) {
      response = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      let finalData = { ...response.data, score: 0 };
      if (this.state.jokes.indexOf(finalData.joke) !== -1) {
        response = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
      } else {
        setTimeout(() => {
          this.setState({
            jokes: [...this.state.jokes, finalData],
            isLoading: false,
          });
        }, 2000);
      }
    }
  }
  render() {
    console.log("in render 2");
    let jokes;
    if (this.state.isLoading) {
      jokes = (
        <div className="container">
          <div class="box">
            <div class="loader1"></div>
            <p>Loader 1</p>
          </div>
        </div>
      );
    } else {
      jokes = this.state.jokes.map((val, index) => {
        return (
          <div key={val.id} className="jokesCenter-jokeDiv">
            <button
              onClick={() => {
                console.log("arrow this", this);
                this.upVoteClick(index);
              }}
            >
              Upvote
            </button>
            <h5>{val.score}</h5>
            <button onClick={this.downVoteClick}>Downvote</button>
            <h5 className="jokesCenter-jok">{val.joke}</h5>;
          </div>
        );
      });
    }
    return <div className="jokescenter">
       <h1>Random Jokes</h1>
       {jokes}
        </div>;
  }
}

export default JokesCenter;
