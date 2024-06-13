import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import SignUpLogo from '../../images/signUpLogo2.png';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';
import firestore from '@react-native-firebase/firestore';
// import errorlogo from '../../images/error-removebg-preview.png';
import Ionicon from 'react-native-vector-icons/MaterialIcons';


export default function SignUp() {
  //authentication code 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTip, setTip] = useState(false);

  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if (email.length > 0 && password.length > 0 && name.length > 0) {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
     
        setIsSuccess(true);
        Alert.alert('Success', 'You have registered successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setMessage('');
       
        const userData = {
          id: userCredential.user.uid,
          name: name,
          email: email,
        };

        await firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .set(userData);
          //___________________________________________________
          await auth().currentUser.sendEmailVerification();
          await auth().signOut();
          alert('User verification has been sent to you.');
          navigation.navigate('Login');
          //________________________________________________
      }

      
      else {
        setTip(true);
      }
    } catch (err) {
      
      setIsSuccess(false);
      setMessage(err.message);
    }
  };
  //authentication code 
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
          <Image source={SignUpLogo} style={styles.image} />
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.registerLabel}>Create an account</Text>

        </View>
        <KeyboardAvoidingView style={styles.inputGroup}>

          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Ionicon name="person" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Name "
                placeholderTextColor="gray"
                value={name}
                onChangeText={value => setName(value)}
              />
            </View>
          </View>
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
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Ionicon name="lock-outline" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity activeOpacity={0.5} style={styles.btnContainer} onPress={() => handleSignup()} >
          <Text style={styles.signUp}>Register Now</Text>
        </TouchableOpacity>

        <Tooltip
          isVisible={showTip}
          content={
            <View style={styles.tooltipContent}>
              {/* <Ionicon name="warning" size={20} color="gray" style={styles.icon} /> */}
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
  frame:{
    backgroundColor:"#F5F5DC",
    flex:1,


  },

  Gobackbutton: {
    padding:10 
  },


  imageContainer: {
   // paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: 200,
    height: 200,

  },
  registerLabel: {

    fontSize: 35,
    alignSelf: "center",
    fontWeight: 'bold',
    padding: 30,
    color: "#5C4033",
   fontFamily:"georgia"
  },

  inputGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,

  },
  container: {
    width: "80%",
    padding: 7,
   // backgroundColor:"red"
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
    backgroundColor: "#C19A6B",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
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
