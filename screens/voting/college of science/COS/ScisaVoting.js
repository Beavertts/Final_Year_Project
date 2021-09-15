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

function ScisaVoting({ navigation }) {
  const [loading, setloading] = useState(true);
  const [ScisaMain, setScisaMain] = useState([]);
  const [ScisaGenSec, setScisaGenSec] = useState([]);
  const [ScisaOrgSec, setScisaOrgSec] = useState([]);
  const [ScisaFinSec, setScisaFinSec] = useState([]);
  const [ScisaWocom, setSrcWoCom] = useState([]);

  const form = {};
  const updateForm = (field, e, form) => (form[field] = e.cID);

  const fetchMainData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/scisa-presidents/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((data) =>
          setScisaMain((curr) => [...curr, { label: data.Name, cID: data.cID }]),
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  const fetchGenSecData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/scisa-gensec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((GenSecdata) =>
          setScisaGenSec((turr) => [
            ...turr,
            { label: GenSecdata.Name, cID: GenSecdata.cID },
          ])
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  const fetchFinSecData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/scisa-finsec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((FinSecdata) =>
          setScisaFinSec((furr) => [
            ...furr,
            { label: FinSecdata.Name, cID: FinSecdata.cID },
          ])
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  const fetchOrgSecData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/scisa-orgsec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((OrgSecdata) =>
          setScisaOrgSec((furr) => [
            ...furr,
            { label: OrgSecdata.Name, cID: OrgSecdata.cID },
          ])
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  const fetchWoComData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/scisa-wocom/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((WoComdata) =>
          setSrcWoCom((wurr) => [
            ...wurr,
            { label: WoComdata.Name, cID: WoComdata.cID },
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
    fetchOrgSecData();
  }, []);

  const handleForm = async () => {
    if (Object.values(form).length < 5) {
      Alert.alert("Voting Error!", "Select in each category");
      return false;
    } else {
      submitForm();
      Alert.alert("Voted Casted Successfully!");
      navigation.navigate("Home");
    }
  };

  const submitForm = async () => {
    fetch("https://a741eb4569d3.ngrok.io/send-scisapresvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        president: `${Object.values([form.president])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-scisagenvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Scisagensec: `${Object.values([form.GeneralSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-scisafinvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Scisafinsec: `${Object.values([form.FinancialSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-scisaorgvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Scisaorgsec: `${Object.values([form.OrganisingSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-scisawocomtvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Scisawocom: `${Object.values([form.WomenCommissioner])}`,
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
              <Title>SCISA PRESIDENT</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={ScisaMain}
                selectedBtn={(e) => {
                    console.log(e)
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
              <Title>SCISA GENERAL SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={ScisaGenSec}
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
              <Title>SCISA FINANCIAL SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={ScisaFinSec}
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
              <Title>SCISA ORGANISING SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={ScisaOrgSec}
                selectedBtn={(e) => {
                  // console.log(e);
                  updateForm("OrganisingSecretary", e, form);
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
              <Title>SCISA WOMEN COMMISSIONER</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={ScisaWocom}
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

export default ScisaVoting;
