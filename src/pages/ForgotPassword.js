import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import passwordlogo from '../../images/forgotpassword.png';
import { auth } from "../../reactNativeConfig"

export default function ForgotPassword({ navigation }) {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleForgetPassword = async () => {
    try {
      if (email.length > 0) {

        //const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setIsSuccess(true);
            setMessage('Password reset email sent successfully!');
            Alert.alert('Success', 'Password reset email sent successfully!');
          });

      } else {
        setMessage('Please enter an email address.');
        Alert.alert('Error', 'Please enter an email address.');
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage(err.message);

    }
  };
  return (
    <View>
      <ScrollView>
        <TouchableOpacity style={styles.Gobackbutton} onPress={() => navigation.goBack()}>
          <Text style={styles.goBtnText}>Go Back</Text></TouchableOpacity>
        <View style={styles.imageContainer} >
          <Image source={passwordlogo} style={styles.image} />
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.registerLabel}>Reset your password</Text>

        </View>
        <KeyboardAvoidingView style={styles.inputGroup}>


          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={value => setEmail(value)} />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="gray"
              onChangeText={(text) => { }}
              secureTextEntry
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              onChangeText={(text) => { }}
              secureTextEntry
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity activeOpacity={0.5} style={styles.btnContainer} onPress={handleForgetPassword}>
          <Text style={styles.signUn}>Save</Text>
        </TouchableOpacity>
        {message ? (
          <View style={styles.messageContainer}>
            <Text style={[styles.messageText, isSuccess ? styles.success : styles.error]}>
              {message}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  Gobackbutton: {
    width: 100,
    height: 40,
    backgroundColor: "#FFC76C",
    top: 20,
    left: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "black"
  },
  goBtnText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20
  },

  imageContainer: {
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center'

  },
  image: {
    width: 200,
    height: 200,

  },
  registerLabel: {

    fontSize: 30,
    alignSelf: "center",
    fontWeight: 'bold',
    padding: 30,
    color: "black"

  },
  mainContainer: {
    alignItems: "center"
  },
  container: {
    // backgroundColor: "tomato",
    width: "80%",
    padding: 7,
    width: 370,

    alignSelf: "center"
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
    fontSize: 18,
    borderRadius: 20,
    color: "black",

  },
  btnContainer: {
    borderRadius: 20,
    backgroundColor: "#FFC76C",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: 200,
    alignSelf: "center",

  },
  signUn: {
    fontSize: 20,
    // backgroundColor: "#FFC76C",
    // paddingVertical: 13,
    // paddingHorizontal: 30,
    borderRadius: 20,
    color: "black",
    justifyContent: 'center',
    alignItems: "center",
    fontWeight: 'bold',
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  messageText: {
    fontSize: 16,
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
})
