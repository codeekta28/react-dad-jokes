// saw colt video and then making it
import React, { Component } from "react";
import axios from "axios";
import "./JokeList.css";
import Joke from "./Joke";
import { v4 as uuidv4 } from 'uuid';


class JokeList extends Component {
  static defaultProps = {
    totalCount: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      // jokes:[],
      jokes:JSON.parse(window.localStorage.getItem("jokes")||"[]"),
      isLoading: false,
    };
     this.uniqueJoke=new Set(this.state.jokes.map((val)=>val.joke));
     console.log("unique joke in constructor",this.uniqueJoke)
     this.newJokeHandle=this.newJokeHandle.bind(this);
    //  console.log("unique joke in constructor",this.uniqueJoke)
     console.log("1 in constructor")
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJoke();
  console.log("3 in component mount method")
  }
  async getJoke() {
    try{
    const tempArray = [];
    console.log("4 in function")

    while(tempArray.length<10){
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      let finalData=res.data;
     
      if(!this.uniqueJoke.has(finalData.id)){
        tempArray.push({joke:finalData.joke,score:0,id:finalData.id});
        this.uniqueJoke.add(finalData.id)
      }else{
        console.log("duplicate found")
      }
     
    }
  
   
     
    this.setState({
      isLoading: false,
      jokes: [...this.state.jokes, ...tempArray],
    });
    window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
    // window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
  }catch(e){
    alert(e);
    this.setState({
      isLoading:false
    })
  }
  }
  handleVote(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((val) => {
          return val.id === id ? { ...val, score: val.score + delta } : val;
        }),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  newJokeHandle() {
    this.setState({ isLoading: true }, this.getJoke);
    this.getJoke();
  }
  render() {
    console.log("2 in render" )
    if (this.state.isLoading) {
      return (
        <div className="jokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h5 className="jokeList-title">Loading</h5>
        </div>
      );
    }
    let sortedJoke=this.state.jokes.sort((a,b)=>b.score-a.score)
    let joke = sortedJoke.map((joke) => {
      return (
        <Joke
          text={joke.joke}
          score={joke.score}
          key={joke.id}
          upClickAction={() => this.handleVote(joke.id, 1)}
          downClickAction={() => this.handleVote(joke.id, -1)}
        />
      );
    });
    return (
      <div className="jokeList">
        <div className="jokeList-sidebar">
          <h1 className="jokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="smiley face"
          />
          <button
            className="jokeList-getMoreJokes"
            onClick={this.newJokeHandle}
          >
            Fetch Jokes
          </button>
        </div>
        <div className="jokeList-jokes">{joke}</div>
      </div>
    );
  }
}

export default JokeList;
