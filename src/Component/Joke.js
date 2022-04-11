import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  // "#4CAF50";
  // "#8BC34A";
  // "#CDDC39";
  // "#FFEB3B";
  // "#FFC107";
  // "#FF9800";
  // "#f44336";
  // "em em-rolling_on_the_floor_laughing"
  // "em em-laughing"
  // "em em-smiley";
  // "em em-slightly_smiling_face"
  // "em em-neutral_face"
  // "em em-confused"
  // "em em-angry"
  getColorAndEmojis() {
    let changeValue;
    if (this.props.score > 15) {
      return (changeValue = {
        color: "#4CAF50",
        emoji: "em em-rolling_on_the_floor_laughing",
      });
    } else if (this.props.score >= 12) {
      return (changeValue = {
        color: "#8BC34A",
        emoji: "em em-laughing",
      });
    } else if (this.props.score >= 9) {
      return (changeValue = {
        color: "#CDDC39",
        emoji: "em em-smiley",
      });
    } else if (this.props.score >= 6) {
      return (changeValue = {
        color: "#FFEB3B",
        emoji: "em em-slightly_smiling_face",
      });
    } else if (this.props.score >= 3) {
      return (changeValue = {
        color: "#FFC107",
        emoji: "em em-neutral_face",
      });
    } else if (this.props.score >= 0) {
      return (changeValue = {
        color: "#FF9800",
        emoji: "em em-confused",
      });
    } else {
        return (changeValue = {
            color:"#f44336",
            emoji:"em em-angry",
          });
    }
  }

  render() {
    return (
      <div className="joke">
        <div className="joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upClickAction}></i>
          <span
            style={{ borderColor: this.getColorAndEmojis().color }}
            className="score"
          >
            {this.props.score}
          </span>
          <i
            className="fas fa-arrow-down"
            onClick={this.props.downClickAction}
          ></i>
        </div>
        <div className="joke-text">{this.props.text}</div>
        <div className="joke-emoji">
          <i className={this.getColorAndEmojis().emoji}></i>
        </div>
      </div>
    );
  }
}

export default Joke;
