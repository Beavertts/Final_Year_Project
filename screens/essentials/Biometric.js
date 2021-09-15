import React, { Component } from 'react';
import { StyleSheet, Text, Platform, Alert,View,TouchableOpacity, BackHandler } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication'

class Biometric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compatible: false
    }
  }

  componentDidMount(){
    this.checkDeviceForHardware();
  }
  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({compatible});
    if (!compatible) {
      this.showIncompatibleAlert();
    }
  };

  showIncompatibleAlert = () => {
    Alert.alert(
            "Incompatible Device",
            "Please vote at the nearest polling center"
        )
        ///this.props.navigation.navigate("Home")
        return
  }

  checkForBiometrics = async () => {
    let biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (!biometricRecords) {
      Alert.alert("Please ensure you've set biometrics" [
        {
          text: "OK", onPress: () => BackHandler.exitApp()
        }
      ])
      return
      //this.props.navigation.navigate("Home")
    } else {
      this.handleLoginPress();
    }
  };

  handleLoginPress = () => {
    if (Platform.OS === 'android') {
      this.showAndroidAlert();
    } else {
      this.scanBiometrics();
    }
  };

  showAndroidAlert = () => {
    //Alert.alert('Fingerprint Scan', 'Place your finger over the touch sensor.');
    this.scanBiometrics();
  };

  scanBiometrics = async () => {
    let result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      Alert.alert('Success', 'Biometric completed Successfully');
      await this.props.navigation.navigate("Home")
    } else {
     return Alert.alert("Error", 'Bio-Authentication failed or cancelled.');
    }
  };

render() {
  <StatusBar style="auto" />

  return (      
      <View style={styles.container}>
    <TouchableOpacity
      onPress={
        this.state.compatible
          ? this.checkForBiometrics
          : this.showIncompatibleAlert
      }
      style={styles.button}>
      <Text style={styles.buttonText}>
        Verify
      </Text>
    </TouchableOpacity>
  </View>
);}
}

export default Biometric

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#aa46eb',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.30)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  logo: {
    height: 128,
    width: 128,
  },
});
