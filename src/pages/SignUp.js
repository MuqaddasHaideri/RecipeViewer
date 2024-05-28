import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import SignUpLogo from '../../images/signUpLogo.png';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';
// import errorlogo from '../../images/error-removebg-preview.png';


export default function SignUp() {
  //authentication code 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTip, setTip] = useState(false);

  const navigation = useNavigation();

  const handleSignup= async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        // const { uid } = userCredential.user;

        // await database().ref(`/users/${uid}`).set({
        //   name: name,
        //   email: email,
        // });

        // console.log(userCredential);
        setIsSuccess(true);
        Alert.alert('Success', 'You have registered successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setMessage('');
        navigation.navigate('Login')
      }
      else {
        setTip(true);
      }
    } catch (err) {
      // console.log(err);
      setIsSuccess(false);
      setMessage(err.message);
    }
  };
  //authentication code 
  return (
    <View>
      <ScrollView>
        <TouchableOpacity style={styles.Gobackbutton} onPress={() => navigation.goBack()}>
          <Text style={styles.goBtnText}>Go Back</Text></TouchableOpacity>
        <View style={styles.imageContainer} >
          <Image source={SignUpLogo} style={styles.image} />
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.registerLabel}>Create an account</Text>

        </View>
        <KeyboardAvoidingView style={styles.inputGroup}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="gray"
              value={name}
              onChangeText={value => setName(value)}
            />
          </View>

          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={value => setEmail(value)}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity activeOpacity={0.5} style={styles.btnContainer} onPress={() => handleSignup()} >
          <Text style={styles.signUp}>SignUp</Text>
        </TouchableOpacity>

        <Tooltip 
          isVisible={showTip}
          content={
            <View style={styles.tooltipContent}>
              <Text style={styles.tooltipText}>All fields are required</Text>
            </View>
          }
          placement="top"
          onClose={() => setTip(false)}
        />
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
  signUp: {
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

  tooltipContent: {
    backgroundColor: 'white',

    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
 
   
  },
  tooltipText: {
   
    color: 'black',
    fontSize: 16,
   
    //backgroundColor:"red"
  },


 


})
