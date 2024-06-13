import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'; // Import Firestore


//the route contain the information which we had passed in the parameter of the naviation in last button
export default function dummy({ route, navigation }) {
    //we will set the cardid the informtion which the route brings in the paramter
  const { cardId } = route.params;
  const [name, setName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [calaries, setCalaries] = useState('');

  useEffect(() => {
    //this function will fetch data which we have passed in route and assigned it to cardId.
    const fetchData = async () => {
      try {
        const doc = await firestore().collection('dummy').doc(cardId).get();
        if (doc.exists) {
          const data = doc.data();
          setName(data.name);
          setIngredient(data.ingredient);
          setCalaries(data.calaries); 
        }
      } catch (error) {
        console.log("Error fetching document: ", error);
      }
    };

    fetchData();

    //this will run when the data will be change in the params
  }, [cardId]);


  //upadata function
  const handleUpdate = async () => {
    try {
        //function which takes cardid and update the information of object
      await firestore().collection('dummy').doc(cardId).update({
        //cahnge it as per need.
        name,
        ingredient,
        calaries,
      });
      //go back if you done update after pressing save 
      navigation.goBack(); 
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <TouchableOpacity style={styles.gobackButton} onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Calaries"
            placeholderTextColor="gray"
            value={calaries}
            onChangeText={value => setCalaries(value)}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingredient"
            placeholderTextColor="gray"
            value={ingredient}
            onChangeText={value => setIngredient(value)}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={value => setName(value)} // Corrected function name
          />
        </View>
        <TouchableOpacity style={styles.savebtn} onPress={handleUpdate}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    savebtn:{
    margin:20,
    padding:20,
    backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    },
  maincontainer: {
    flex: 1,
    backgroundColor: "#F5F5DC",
    justifyContent: "center",
    alignItems: "center"
  },
  gobackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: "blue",
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
  input: {
    flex: 1, // Ensure TextInput takes up remaining space
    padding: 10,
    color:"black"
    // Add any other styles you need
  },
});
