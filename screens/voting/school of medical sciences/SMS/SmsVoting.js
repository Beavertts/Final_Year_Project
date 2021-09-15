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

function SmsVoting({ navigation }) {
  const [loading, setloading] = useState(true);
  const [SmsMain, setSmsMain] = useState([]);
  const [SmsGenSec, setSmsGenSec] = useState([]);
  const [SmsOrgSec, setSmsOrgSec] = useState([]);
  const [SmsFinSec, setSmsFinSec] = useState([]);
  const [SmsWocom, setSmsWoCom] = useState([]);

  const form = {};
  const updateForm = (field, e, form) => (form[field] = e.cID);

  const fetchMainData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/sms-presidents/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((data) =>
          setSmsMain((curr) => [...curr, { label: data.Name, cID: data.cID }]),
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  const fetchGenSecData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/sms-gensec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((GenSecdata) =>
          setSmsGenSec((turr) => [
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
    fetch(`https://a741eb4569d3.ngrok.io/sms-finsec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((FinSecdata) =>
          setSmsFinSec((furr) => [
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
    fetch(`https://a741eb4569d3.ngrok.io/sms-orgsec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((OrgSecdata) =>
          setSmsOrgSec((furr) => [
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
    fetch(`https://a741eb4569d3.ngrok.io/sms-wocom/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((WoComdata) =>
          setSmsWoCom((wurr) => [
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
    fetch("https://a741eb4569d3.ngrok.io/send-smspresvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        president: `${Object.values([form.president])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-smsgenvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Smsgensec: `${Object.values([form.GeneralSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-smsfinvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Smsfinsec: `${Object.values([form.FinancialSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-smsorgvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Smsorgsec: `${Object.values([form.OrganisingSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-smswocomtvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Smswocom: `${Object.values([form.WomenCommissioner])}`,
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
              <Title>S.M.S PRESIDENT</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={SmsMain}
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
              <Title>S.M.S GENERAL SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={SmsGenSec}
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
              <Title>S.M.S FINANCIAL SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={SmsFinSec}
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
              <Title>S.M.S ORGANISING SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={SmsOrgSec}
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
              <Title>S.M.S WOMEN COMMISSIONER</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={SmsWocom}
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

export default SmsVoting;
