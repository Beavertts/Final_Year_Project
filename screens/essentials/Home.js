import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  FlatList,
  Text,
  ImageBackground,
} from "react-native";
import { TextInput, Button, Switch } from "react-native-paper";
import { SizedBox } from "sizedbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const Home = (props,{ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [data, setData] = useState([]);
  const [voterID, setvoterID] = useState("");
  const [loading, setloading] = useState(true);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const fetchData = async () => {
    await fetch(
      `https://a741eb4569d3.ngrok.io/:${voterID}/:${username}/:${password}`
    )
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setloading(false);
      })
      .catch((err) => {
        Alert.alert("Something went wrong");
        console.log(err);
      });
  };

  const tempFunc = async () => {
    fetch(`https://a741eb4569d3.ngrok.io/${voterID}/${username}/${password}`)
      .then(async (res) => {
        try {
          const data = await res.json();

          if (!data.payload) {
            Alert.alert("error", data.message);
            return;
          }
          const { userId, status, name } = data.payload;
          await AsyncStorage.setItem("@id", userId);
          return status
            ? Alert.alert(`${name} has already voted`, "Please Exit The App")
            : props.navigation.navigate("Profile", { item: data.payload });
        } catch (error) {
          console.log("decode error", error);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Check Your internet connection");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    return;
  };

  const renderHomePage = () => {
    return (
      <ImageBackground
        blurRadius={10}
        style={styles.ImgStyle}
        source={require("../../assets/img/HomeScreen.jpg")}
      >
        <View style={styles.cardStyle}>
          <TextInput
            autoFocus
            label="User ID"
            mode="flat"
            theme={{
              colors: {
                primary: "#d417f7",
                background: "transparent",
                placeholder: "#d9d9d9",
                text: "white",
              },
            }}
            onChangeText={(text) => setvoterID(text)}
            accessibilityHint="Enter Index Number"
            keyboardType="numeric"
            autoFocus={true}
            style={styles.borderStyle}
          />
          <SizedBox vertical={10} />
          <TextInput
            autoFocus
            label="Username"
            mode="flat"
            theme={{
              colors: {
                primary: "#d417f7",
                background: "transparent",
                placeholder: "#d9d9d9",
                text: "white",
              },
            }}
            onChangeText={(text) => setusername(text)}
            accessibilityHint="Enter Usename"
            autoCapitalize="none"
          />
          <SizedBox vertical={10} />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              autoFocus
              contextMenuHidden={true}
              style={styles.input}
              label="Password"
              mode="flat"
              theme={{
                colors: {
                  primary: "#d417f7",
                  background: "transparent",
                  placeholder: "#d9d9d9",
                  text: "white",
                },
              }}
              onChangeText={(text) => setpassword(text)}
              secureTextEntry={!isSwitchOn}
              autoCompleteType="off"
              accessibilityHint="Enter Password"
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 7 }}>
            <Text style={{ marginTop: 7, marginRight: 4, color: "#d9d9d9" }}>
              {isSwitchOn ? "Hide" : "Show"} Password
            </Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>
          <SizedBox vertical={10} />
          <Button
            style={styles.btnStyle}
            icon="login"
            mode="contained"
            labelStyle=""
            theme={{ colors: { primary: "#b369ea" } }}
            onPress={tempFunc}
          >
            LOGIN
          </Button>
        </View>
      </ImageBackground>
    );
  };

  return (
    <FlatList
      data={[{}]}
      renderItem={({ item }) => {
        return renderHomePage(item);
      }}
      keyExtractor={(item) => `${item._id}`}
      onRefresh={() => {
        fetchData();
      }}
      refreshing={loading}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default Home;

const styles = StyleSheet.create({
  ImgStyle: {
    flex: 1,
    width: width,
    height: height + 60,
  },
  cardStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
  },
  btnStyle: {
    marginTop: 10,
    marginLeft: 70,
    marginRight: 70,
  },
  input: {
    flex: 1,
  },
});
