import { StyleSheet, Text, View } from 'react-native'

import LottieView from 'lottie-react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react'

export default function EmailSent() {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
          const routeName = 'ForgotPasswordPg';
          navigation.dispatch(StackActions.replace(routeName));
        }, 2000);
    
        return () => clearTimeout(timer);  // Clear the timeout if the component unmounts
      }, [navigation]);
  return (

    <View style={styles.container}>
        <View style={styles.TextContainer}>
        <Text style={styles.label1}>Check in your Email</Text>
        <Text style={styles.label2}>We just emailed you reset password link</Text>
        </View>
 <LottieView
          style={{flex: 1, height:350,width:350}}
          source={require('./emailsentAnimation.json')} /* I think your issue is that you have the wrong path for your lottie file*/
          autoPlay
          loop
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5DC",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      label1: {
        fontSize: 40,
        color: "#5C4033",
        fontWeight:"bold",
      //  marginBottom: 10,
      },
      label2: {
        marginTop:10,
        fontSize: 20,
        color: "gray",
      },
      TextContainer: {
    marginTop:40,
    paddingTop:30,
    justifyContent:"center",
    alignItems:"center"
      },

})