import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import imageforbg from '../../images/bgimage.jpg'
import {useNavigation, StackActions} from '@react-navigation/native';
export default function RecipeList({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageforbg} style={styles.image} />
        <View style={styles.transparent}>
          {/* <TouchableOpacity style={styles.Gobackbutton} onPress={() => navigation.dispatch(StackActions.replace('Login'))}>
            <Text style={{ color: "black" }}>Go Back</Text></TouchableOpacity> */}
          {/* searchbox */}
          <TouchableOpacity activeOpacity={0.7} style={styles.searchBox} ></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({

  container: {
    // backgroundColor: "#ffdb75",
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageContainer: {
    height: '40%',
    width: '100%',

  },
  image: {
    height: '100%',
    width: '100%',


  },
  transparent: {
    
    height: '100%',
    width: '100%',
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    elevation:10,
    width: '90%',
    height: 60,
    backgroundColor: "white",
    borderRadius:10,
  },
  Gobackbutton: {
    width: 70,
    borderBlockColor: "white",
    height: 20,
    backgroundColor: "white",
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
  }


})

