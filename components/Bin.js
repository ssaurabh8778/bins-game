import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default ({ color, binWidth, binHeight, count, add, iconSize }) => {
  return (
    <View
      style={{
        backgroundColor: "lightgrey",
        width: binWidth / 2,
        height: binHeight / 3,
        alignItems: "center",
        paddingTop: 50,
      }}
    >
      <Button color={color} title={JSON.stringify(count)} />
      <Ionicons
        name="trash-bin-sharp"
        size={iconSize}
        color={color}
        onPress={() => add()}
      />
    </View>
  );
};
