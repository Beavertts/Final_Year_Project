import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import {  MaterialIcons, MaterialCommunityIcons, Feather  } from "@expo/vector-icons";

const Profile = (props) => {
  const {
    userId,
    name,
    picture,
    college,
    phone,
    email,
    course,
    username,
    password,
    status,
    _id,
  } = props.route.params.item;

const cs = 'College of Science';
const sms = 'School of Medical Sciences';
const ksb = 'Knust School of Business';
const coe = 'College of Engineering';

const CsDepart = 'Computer Science'
const ActurialDepart = 'Acturial Science'

const HumanBioDepart = 'Human Biology'
const PharmacyDepart = 'Pharmacy'

const MarketingDepart = 'Marketing'
const BusadminDepart = 'Business Administration'

const MechanicalDepart = 'Mechanical Engineering'
const GeologicalDepart = 'Geological Engineering'

const handleSubmit = () => {
  if (cs === college && CsDepart === course) {
    props.navigation.navigate("Computer Science")
    return;
  } else if (cs === college && ActurialDepart === course) {
    props.navigation.navigate('Acturial Science')
    return
  } else if (sms === college && HumanBioDepart === course) {
    props.navigation.navigate('Human Biology')
    return
  } else if (sms === college && PharmacyDepart === course) {
    props.navigation.navigate('Pharmacy')
    return
  } else if (ksb === college && BusadminDepart === course) {
    props.navigation.navigate("Business Administration")
    return;
  } else if (ksb === college && MarketingDepart === course) {
    props.navigation.navigate("Marketing")
    return;
  } else if (coe === college && MechanicalDepart === course) {
    props.navigation.navigate("Mechanical Engineering")
    return;
  } else if (coe === college && GeologicalDepart === course) {
    props.navigation.navigate("Geological Engineering")
    return;
  } 
  else return;
}

  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient
        colors={["#edd38c", "#9e32c8"]}
        style={{ height: "20%" }}
      ></LinearGradient>
      <View style={styles.linearViewStyle}>
        <Image style={styles.linearImageStyle} source={{ uri: picture }} />
      </View>
<ScrollView decelerationRate = 'fast' overScrollMode = 'always'>
      <View style={{ alignItems: "center", margin: 10 }}>
        <Title>{name}</Title>
        <Text>{college} --- {course}</Text>
      </View>
      
      <Card style={styles.cardStyle}>
        <View style={styles.cardViewStyle}>
          <MaterialCommunityIcons name="id-card" size={32} color="#9e32c8" />
          <Text style={styles.matTextStyle}>{userId}</Text>
        </View>
      </Card>

      <Card style={styles.cardStyle}>
        <View style={styles.cardViewStyle}>
          <Feather  name="user" size={32} color="#9e32c8" />
          <Text style={styles.matTextStyle}>{username}</Text>
        </View>
      </Card>

      <Card style={styles.cardStyle}>
        <View style={styles.cardViewStyle}>
          <MaterialIcons name="vpn-key" size={32} color="#9e32c8" />
          <Text style={styles.matTextStyle}>{_id}</Text>
        </View>
      </Card>

      <Card style={styles.cardStyle}>
        <View style={styles.cardViewStyle}>
          <MaterialIcons name="email" size={32} color="#9e32c8" />
          <Text style={styles.matTextStyle}>{email}</Text>
        </View>
      </Card>

      <Card style={styles.cardStyle}>
        <View style={styles.cardViewStyle}>
          <MaterialIcons name="local-phone" size={32} color="#9e32c8" />
          <Text style={styles.matTextStyle}>{phone}</Text>
        </View>
      </Card>

      <View style={styles.viewButton}>
        <Button
          color = "#9e32c8"
          icon="fingerprint"
          mode="contained"
          onPress={handleSubmit}
          //onPress={() => props.navigation.navigate("Biometric")}
        >
          {name}, click to Authenticate
        </Button>
      </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  root: {
    //backgroundColor: "#b2c0f1",
    flex: 1,
  },
  root2: {
      flex: 1
  },
  linearViewStyle: {
    alignItems: "center",
  },
  linearImageStyle: {
    height: 160,
    width: 160,
    borderRadius: 80,
    marginTop: -70,
  },
  cardStyle: {
    margin: 4,
  },
  cardViewStyle: {
    //backgroundColor: "#",
    flexDirection: "row",
    padding: 8,
  },
  matTextStyle: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 18,
  },
  viewButton: {
    
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 5,
    paddingTop: 40,
  },
});
export default Profile;
