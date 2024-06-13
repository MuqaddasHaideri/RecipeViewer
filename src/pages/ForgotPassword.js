import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import passwordlogo from '../../images/lockimage.png';
import { auth } from "../../reactNativeConfig"
import Ionicon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigation = useNavigation();
  const handleForgetPassword = async () => {
    try {
      if (email.length > 0) {

        //const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setIsSuccess(true);
            navigation.navigate('emailSentPg');
           // setMessage('Password reset email sent successfully!');
           // Alert.alert('Success', 'Password reset email sent successfully!');
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
    <View style={styles.frame}>
      <ScrollView>
      <View style={styles.Gobackbutton}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
        <Ionicon name="arrow-circle-left" size={60} color="#C19A6B"/>
          {/* <Text style={styles.goBtnText}>Go Back</Text> */}
          </TouchableOpacity>
          </View>
        <View style={styles.imageContainer} >
          <Image source={passwordlogo} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.registerLabel}>Forgot your password?</Text>
          <Text style={styles.emailText}>Enter your registered email and we will send you a link to reset your password.</Text>
        </View>
        <View style={styles.mainContainer}>
          <KeyboardAvoidingView style={styles.inputGroup}>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <Ionicon name="alternate-email" size={20} color="gray" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="gray"
                  value={email}
                  onChangeText={value => setEmail(value)}
                />
              </View>
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
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  // Gobackbutton: {
  //   width: 100,
  //   height: 40,
  //   backgroundColor: "#FFC76C",
  //   top: 20,
  //   left: 20,
  //   borderRadius: 20,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: "black"
  // },
  // goBtnText: {
  //   color: "black",
  //   fontWeight: "bold",
  //   fontSize: 20
  // },
  frame:{
    
    flex:1,
    backgroundColor:"#F5F5DC"
  },
  Gobackbutton: {
    padding:10 
  },

  imageContainer: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center'

  },
  image: {
    width: 250,
    height: 250,

  },
  registerLabel: {
    fontSize: 35,
    alignSelf: "center",
    fontWeight: 'bold',
    // padding: 30,
    // backgroundColor:"red",
    padding: 10,
    color: "#5C4033",

  },
  textContainer: {
    //backgroundColor:"blue",
    paddingTop:20,
  },
  mainContainer: {
   // backgroundColor: "blue",
   flex:1,
   paddingTop:25,

    justifyContent: "center"
  },
  emailText: {
    fontSize: 17,
    color: "gray",
    // padding: 10,
    width: 350,
    alignSelf: "center",
    textAlign: "center"
    // alignSelf:"center",
    // justifyContent:"center"
  },
  // container: {
  //   // backgroundColor: "tomato",
  //   width: "80%",
  //   padding: 7,
  //   width: 370,

  //   alignSelf: "center"
  // },
  // input: {
  //   padding: 15,
  //   borderWidth: 1,
  //   borderColor: 'black',
  //   marginBottom: 5,
  //   fontSize: 18,
  //   borderRadius: 20,
  //   color: "black",

  // },
  inputGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,

  },
  container: {
    width: "80%",
    padding: 7,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    padding: 6,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 2,
    borderRadius: 30,
    justifyContent: "space-between"

  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 20
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "black",
    paddingLeft: 40,
  },
  btnContainer: {
    borderRadius: 20,
    backgroundColor:"#C19A6B",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
