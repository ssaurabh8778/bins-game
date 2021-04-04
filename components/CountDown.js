import React, { Component } from "react";
import { View, Dimensions } from "react-native";
const { width } = Dimensions.get("screen");

export default class Countdown extends Component {
  state = { countdown: width };

  componentDidMount() {
    if (this.props.countdownTime) {
      this.runCountdown();
    }
  }

  runCountdown = () => {
    let countdownStartTime = new Date().getTime();
    let id = setInterval(() => {
      if (
        new Date().getTime() >=
        countdownStartTime + this.props.countdownTime
      ) {
        this.props.onTimeEnd && this.props.onTimeEnd();
        this.setState({ countdown: 0, stopGame: true });
        return clearInterval(id);
      }
      return this.setState({
        countdown:
          width -
          ((new Date().getTime() - countdownStartTime) /
            this.props.countdownTime) *
            width,
      });
    }, 100);
  };

  render() {
    let countdownBar = {
      backgroundColor: "#192d4e",
      height: 5,
      position: "absolute",
      top: 100,
    };

    return (
      <View
        style={{
          ...countdownBar,
          width: this.state.countdown,
          ...this.props.style,
        }}
      />
    );
  }
}
