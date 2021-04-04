import React, { useState, useEffect } from "react";
import * as Progress from "react-native-progress";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import Constants from "expo-constants";
import Bin from "./components/Bin";
import Bird from "./components/Bird";
import Countdown from "./components/CountDown";
import Obstacles from "./components/Obstacle";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const colors = ["red", "green"];

  const [birdLeft, setBirdLeft] = useState(screenWidth / 2);
  const [birdLeft2, setBirdLeft2] = useState(screenWidth / 2);
  const [birdBottom, setBirdBottom] = useState(screenHeight);
  const [birdBottom2, setBirdBottom2] = useState(
    screenHeight + screenHeight / 3
  );
  const [birdColor, setBirdColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );
  const [birdColor2, setBirdColor2] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  const [greenCount, setGreenCount] = useState(0);
  const [redCount, setRedCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [progress, setProgres] = useState(0);
  const [score, setScore] = useState(0);

  const [greenIconSize, setGreenIconSize] = useState(150);
  const [redIconSize, setRedIconSize] = useState(150);
  const gravity = 5;
  let gameTimerId;
  let gameTimerId2;
  let progressTimerId2;

  //start bird falling
  useEffect(() => {
    if (progress < 1) {
      progressTimerId = setInterval(() => {
        setProgres((progress) => progress + 0.1 / 20);
      }, 100);

      return () => {
        clearInterval(progressTimerId);
      };
    }
  }, [progress]);

  useEffect(() => {
    if (birdBottom > screenHeight / 3) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 10);

      return () => {
        clearInterval(gameTimerId);
      };
    } else {
      setBirdBottom(screenHeight);

      setBirdColor(colors[Math.floor(Math.random() * colors.length)]);
      setBirdLeft(screenWidth / 2);
    }
  }, [birdBottom]);

  useEffect(() => {
    if (birdBottom2 > screenHeight / 3) {
      gameTimerId2 = setInterval(() => {
        setBirdBottom2((birdBottom2) => birdBottom2 - gravity);
      }, 10);

      return () => {
        clearInterval(gameTimerId2);
      };
    } else {
      setBirdBottom2(screenHeight);

      setBirdColor2(colors[Math.floor(Math.random() * colors.length)]);
      setBirdLeft2(screenWidth / 2);
    }
  }, [birdBottom2]);

  const jump = () => {
    console.log("jump");
    if (!isGameOver && birdBottom < screenHeight) {
      // setBirdBottom((birdBottom) => birdBottom + 50);
      console.log("jumped");
    }
  };

  const addGreen = () => {
    if (birdBottom < birdBottom2) {
      if (birdColor === "green") {
        setGreenCount((greenCount) => greenCount + 1);
        setBirdLeft(screenWidth / 2 + 100);
      }
    } else {
      if (birdColor2 === "green") {
        setGreenCount((greenCount) => greenCount + 1);
        setBirdLeft2(screenWidth / 2 + 100);
      }
    }
    setGreenIconSize(160);
    setTimeout(() => {
      setGreenIconSize(150);
    }, 200);
  };
  const addRed = () => {
    if (birdBottom < birdBottom2) {
      if (birdColor === "red") {
        setRedCount((redCount) => redCount + 1);
        setBirdLeft(screenWidth / 2 - 100);
      }
    } else {
      if (birdColor2 === "red") {
        setRedCount((redCount) => redCount + 1);
        setBirdLeft2(screenWidth / 2 - 100);
      }
    }
    setRedIconSize(160);
    setTimeout(() => {
      setRedIconSize(150);
    }, 200m);
  };

  const gameOver = () => {
    clearInterval(gameTimerId);
    setIsGameOver(true);
  };
  const children = ({ remainingTime }) => {
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return (
      <Text>
        {minutes}:{seconds}
      </Text>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => jump()}>
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            paddingTop: 10 + Constants.statusBarHeight,

            justifyContent: "center",
            height: 70 + Constants.statusBarHeight,
            backgroundColor: "white",

            top: 0,
            zIndex: 1,
          }}
        >
          <Progress.Bar progress={progress} width={screenWidth * 0.9} />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              height: 40,

              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <MaterialIcons name="cancel" size={35} color="black" />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Sort By Color
            </Text>
            <CountdownCircleTimer
              isPlaying
              duration={30}
              colors="black"
              size={35}
              strokeWidth={3}
              children={children}
            />
          </View>
        </View>

        <Bird color={birdColor} birdBottom={birdBottom} birdLeft={birdLeft} />
        <Bird
          color={birdColor2}
          birdBottom={birdBottom2}
          birdLeft={birdLeft2}
        />
        <View
          style={{
            position: "absolute",
            flex: 1,
            flexDirection: "row",
            width: screenWidth,
            height: screenHeight / 3,
            left: 0,
            bottom: 0,
          }}
        >
          <Bin
            color={"red"}
            binWidth={screenWidth}
            binHeight={screenHeight}
            add={addRed}
            count={redCount}
            iconSize={redIconSize}
          />
          <Bin
            color={"green"}
            binWidth={screenWidth}
            binHeight={screenHeight}
            add={addGreen}
            count={greenCount}
            iconSize={greenIconSize}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
