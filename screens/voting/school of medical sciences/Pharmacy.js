import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";
import { Button, Card } from "react-native-paper";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import { FontAwesome5 } from "@expo/vector-icons";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const Pharmacy = ({ navigation, route }) => {
  return (
    <ImageBackground
      blurRadius={2}
      style={styles.ImgStyle}
      source={{
        //uri: "https://images.unsplash.com/photo-1534293230397-c067fc201ab8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        uri: "https://images.unsplash.com/photo-1616442830389-0ad5a8489dfc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      }}
    >
      <View style={styles.cardStyle}>
        <Button
          style={styles.btnStyle}
          icon="login"
          mode="contained"
          labelStyle=""
          theme={{ colors: { primary: "#ccc" } }}
          onPress={() => navigation.navigate("SRC VOTING")}
        >
          SRC VOTING
        </Button>
        <MenuProvider style={{ flexDirection: "column", paddingTop: 15 }}>
          <Menu
            onSelect={(value) =>
              value == "Sms Voting"
                ? navigation.navigate("Sms Voting", alert(`${value}`))
                : alert(`${value}`)
            }
          >
            <MenuTrigger>
              <Card>
                <View style={styles.cardViewStyle}>
                  <FontAwesome5
                    name="caret-square-down"
                    size={14}
                    color="black"
                  />
                  <Text style={styles.headerText}>
                    SCHOOL OF MEDICAL SCIENCE VOTING
                  </Text>
                </View>
              </Card>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value={"Sms Voting"}>
                <Text style={styles.menuContent}>1. S.M.S Voting</Text>
              </MenuOption>
              <MenuOption value={"Department"}>
                <Text style={styles.menuContent}>
                  2.Pharmacy Department Voting
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </MenuProvider>
      </View>
    </ImageBackground>
  );
};
export default Pharmacy;

const styles = StyleSheet.create({
  ImgStyle: {
    flex: 1,
    width: width,
    height: height,
  },
  cardStyle: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  btnStyle: {
    padding: 10,
    marginTop: 20,
  },
  menuContent: {
    color: "#000",
    fontWeight: "bold",
    padding: 2,
    fontSize: 20,
  },
  headerText: {
    fontSize: 14,
    paddingLeft: 8,
    fontSize: 14,
  },
  cardViewStyle: {
    flexDirection: "row",
    padding: 18,
    backgroundColor: "#ccc",
    justifyContent: "center",
  },
});
