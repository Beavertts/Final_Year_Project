import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import RadioButtonRN from "radio-buttons-react-native";
import { Card, Title, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

function VoteSRC({ navigation }) {
  const [loading, setloading] = useState(true);
  const [SrcMain, setSrcMain] = useState([]);
  const [SrcGenSec, setSrcGenSec] = useState([]);
  const [SrcFinSec, setSrcFinSec] = useState([]);
  const [SrcWocom, setSrcWoCom] = useState([]);

  const form = {};
  const updateForm = (field, e, form) => (form[field] = e.cId);

  //fetching the candidates(aspirants)
  const fetchMainData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/src-presidents/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((data) =>
          setSrcMain((curr) => [...curr, { label: data.Name, cId: data.cId }])
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  const fetchGenSecData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/src-gensec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((GenSecdata) =>
          setSrcGenSec((turr) => [
            ...turr,
            { label: GenSecdata.Name, cId: GenSecdata.cId },
          ])
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  const fetchFinSecData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/src-finsec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((FinSecdata) =>
          setSrcFinSec((furr) => [
            ...furr,
            { label: FinSecdata.Name, cId: FinSecdata.cId },
          ])
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  const fetchWoComData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/src-wocom/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((WoComdata) =>
          setSrcWoCom((wurr) => [
            ...wurr,
            { label: WoComdata.Name, cId: WoComdata.cId },
          ])
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMainData();
    fetchGenSecData();
    fetchFinSecData();
    fetchWoComData();
  }, []);

  const handleForm = async () => {
    if (Object.values(form).length < 4) {
      Alert.alert("Voting Error!", "Select in each category");
      return false;
    } else {
      submitForm();
      Alert.alert("Voted Casted Successfully!");
      navigation.navigate("Home");
      
    }
  };

  const submitForm = async () => {
    fetch("https://a741eb4569d3.ngrok.io/send-presidenttotalvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        president: `${Object.values([form.president])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-gensectotalvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gensec: `${Object.values([form.GeneralSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-finsectotalvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        finsec: `${Object.values([form.FinancialSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-wocomtotalvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wocom: `${Object.values([form.WomenCommissioner])}`,
      }),
    });

    fetch("https://a741eb4569d3.ngrok.io/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: await AsyncStorage.getItem("@id"),
        status: true,
      }),
    });
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator>
        <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
          <Card
            mode="outlined"
            style={{
              borderColor: "blue",
              padding: 10,
              backgroundColor: "#ccc",
            }}
          >
            <Card.Content>
              <Title>SRC PRESIDENT</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
              autoFocus
                data={SrcMain}
                selectedBtn={(e) => {
                  updateForm("president", e, form);
                  console.log("form", form);
                }}
                icon={<Icon name="stop-circle" size={25} color="#2c9dd1" />}
              />
            )}
          </Card>

          <Card
            mode="outlined"
            style={{
              borderColor: "blue",
              marginTop: 20,
              padding: 10,
              backgroundColor: "#ccc",
            }}
          >
            <Card.Content>
              <Title>GENERAL SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
              autoFocus
                data={SrcGenSec}
                selectedBtn={(e) => {
                  console.log(e);
                  updateForm("GeneralSecretary", e, form);
                  console.log("form", form);
                }}
                icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
              />
            )}
          </Card>

          <Card
            mode="outlined"
            style={{
              borderColor: "blue",
              marginTop: 20,
              padding: 10,
              backgroundColor: "#ccc",
            }}
          >
            <Card.Content>
              <Title>FINANCIAL SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
              autoFocus
                data={SrcFinSec}
                selectedBtn={(e) => {
                  // console.log(e);
                  updateForm("FinancialSecretary", e, form);
                  console.log("form", form);
                }}
                icon={<Icon name="gg-circle" size={25} color="#2c9dd1" />}
              />
            )}
          </Card>

          <Card
            mode="outlined"
            style={{
              borderColor: "blue",
              marginTop: 20,
              padding: 10,
              backgroundColor: "#ccc",
            }}
          >
            <Card.Content>
              <Title>WOMEN COMMISSIONER</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
              autoFocus
                data={SrcWocom}
                selectedBtn={(e) => {
                  // console.log(e);
                  updateForm("WomenCommissioner", e, form);
                  console.log("form", form);
                }}
                icon={<Icon name="gg-circle" size={25} color="#2c9dd1" />}
              />
            )}
          </Card>
          <Button
            style={{ marginRight: 70, margin: 30, marginLeft: 70 }}
            icon="login"
            mode="contained"
            labelStyle=""
            theme={{ colors: { primary: "#006aff" } }}
            onPress={handleForm}
          >
            CAST VOTE
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default VoteSRC;
