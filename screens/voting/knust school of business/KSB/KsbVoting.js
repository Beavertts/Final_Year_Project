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

function KsbVoting({ navigation }) {
  const [loading, setloading] = useState(true);
  const [KsbMain, setKsbMain] = useState([]);
  const [KsbGenSec, setKsbGenSec] = useState([]);
  const [KsbOrgSec, setKsbOrgSec] = useState([]);
  const [KsbFinSec, setKsbFinSec] = useState([]);
  const [KsbWocom, setKsbWoCom] = useState([]);

  const form = {};
  const updateForm = (field, e, form) => (form[field] = e.cID);

  const fetchMainData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/ksb-presidents/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((data) =>
          setKsbMain((curr) => [...curr, { label: data.Name, cID: data.cID }]),
        );
      })
      .catch((err) => {
        Alert.alert("Check Your Internet Connection");
        console.log(err);
      });
  };

  const fetchGenSecData = () => {
    fetch(`https://a741eb4569d3.ngrok.io/ksb-gensec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((GenSecdata) =>
          setKsbGenSec((turr) => [
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
    fetch(`https://a741eb4569d3.ngrok.io/ksb-finsec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((FinSecdata) =>
          setKsbFinSec((furr) => [
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
    fetch(`https://a741eb4569d3.ngrok.io/ksb-orgsec/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((OrgSecdata) =>
          setKsbOrgSec((furr) => [
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
    fetch(`https://a741eb4569d3.ngrok.io/ksb-wocom/`)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        res.map((WoComdata) =>
          setKsbWoCom((wurr) => [
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
      await navigation.navigate("Home");
    }
  };

  const submitForm = async () => {
    fetch("https://a741eb4569d3.ngrok.io/send-ksbpresvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        president: `${Object.values([form.president])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-ksbgenvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Ksbgensec: `${Object.values([form.GeneralSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-ksbfinvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Ksbfinsec: `${Object.values([form.FinancialSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-ksborgvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Ksborgsec: `${Object.values([form.OrganisingSecretary])}`,
      }),
    });
    fetch("https://a741eb4569d3.ngrok.io/send-ksbwocomtvotes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Ksbwocom: `${Object.values([form.WomenCommissioner])}`,
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
              <Title>K.S.B PRESIDENT</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={KsbMain}
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
              <Title>K.S.B GENERAL SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={KsbGenSec}
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
              <Title>K.S.B FINANCIAL SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={KsbFinSec}
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
              <Title>K.S.B ORGANISING SECRETARY</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={KsbOrgSec}
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
              <Title>K.S.B WOMEN COMMISSIONER</Title>
            </Card.Content>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RadioButtonRN
                autoFocus
                data={KsbWocom}
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

export default KsbVoting;
