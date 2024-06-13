import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Auth from '@react-native-firebase/auth';
import LoginPg from './LoginPg';
 import LottieView from 'lottie-react-native';


export default function WelcomeHomePg() {
   const navigation = useNavigation();

  useEffect(() => {
    setTimeout( async () => {
      const UserVerification= await Auth().onAuthStateChanged(user => {
         const routeName = user !== null ? 'RecipeList' : 'Login';
       // const routeName = 'Login';
         UserVerification();
        navigation.navigate(routeName);
      });
    }, 2000);

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
       <LottieView
          style={{flex: 1, height:350,width:350}}
          source={require('./foodAnimation.json')} 
          autoPlay
          loop
        />
      </View>
  );}

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: "#F5F5DC",
    flex: 1,
    alignItems:"center"
  },
});