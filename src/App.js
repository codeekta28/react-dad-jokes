import "./App.css";
import { Component } from "react";
// import JokesCenter from "./Component/JokesCenter";
import JokeList from "./Component/JokeList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <JokeList />
        {/* <JokesCenter/> */}
      </div>
    );
  }
}

export default App;
