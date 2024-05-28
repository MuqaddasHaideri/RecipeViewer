import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LoginImage from '../../images/burger.png'
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Auth from '@react-native-firebase/auth';
import LoginPg from './LoginPg';

export default function welcomeHomePg() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     Auth().onAuthStateChanged(user => {
  //       const routeName = user !== null ? 'RecipeList' : 'Login';

  //       navigation.dispatch(StackActions.replace(routeName));
  //     });
  //   }, 3000);

  //   return () => {};
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={LoginImage} style={styles.image} />
        <Text style={styles.headText}>Lorem epsum</Text>
        <Text style={styles.labeltext} >Lorem epsum lorem epsum</Text>
      </View>
      <View style={styles.btnContainer}>
      <TouchableOpacity 
          activeOpacity={0.5} 
          style={styles.btn}
          onPress={() => navigation.navigate('Login')} // Adjust this to navigate to the Login screen
        >
          <Text style={styles.btnText}>Let's Start</Text>
        </TouchableOpacity>
      </View>

      </View>
    

  );}

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: "#ffdb75",
    flex: 1,
  },
  image: {
    // width: 300,
    height: 230,
    resizeMode: 'contain',
  },
  headText: {
    color: "red",
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: "arial",
  },
  labeltext: {
    color: "red"
  },

  imageContainer: {
    // backgroundColor: "red",
    flex:0.7,
    justifyContent:"flex-end",
    alignItems:"center"
  }, btn: {
    backgroundColor: "red",
    borderRadius: 15,
    height: 50,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    // paddingTop: 100,
    flex:0.3,
    // backgroundColor:"orange",
    justifyContent:"center",
    alignItems:"center"
  },
  btnText: {
    fontSize: 20,
    fontWeight:"bold",
  },
  imageContainer: {
    // backgroundColor: "red",
    flex:0.7,
    justifyContent:"flex-end",
    alignItems:"center"
  }

});