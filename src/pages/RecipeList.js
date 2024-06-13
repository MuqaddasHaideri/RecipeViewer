import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,TextInput ,FlatList,Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import imageforbg from '../../images/bgimage.jpg';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/MaterialIcons';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import dummy from './dummy';


export default function RecipeList() {
  const [list, setList] = useState([]);
  const [name,setName]=useState('');
  const [ingredient,setIngredient]=useState('');
  const [calaries,setCalaries]=useState('');
  //--------------------------------------------------------------------------------------------------
  const navigation = useNavigation();
  const navigateToUpdateScreen = (cardId) => {
    //this navigation will take cardId along with it then we will fetfch data frim it.
    navigation.navigate('Dummy', { cardId });
  };
  useEffect(() => {
    const Databaseget = async () => {
      try {
        firestore().collection('dummy').onSnapshot((snap) => {
          const tempArray = [];
          snap.forEach((item) => {
            tempArray.push({
              ...item.data(),
              id: item.id,
            });
          });
          console.log(tempArray);
          setList(tempArray);
        });
      } catch (err) {
        console.log(err);
      }
    };

    Databaseget();
  }, []);


//card id is use for uniquely identify the value of document
//valueOfCARD is taken becuase we use it to make sure the name of the recipe to show in alret before deleting
  const handleCardLongPress = (cardId, valueOfCard) => {
    Alert.alert('Alert', `Are You sure you want  to delete ${valueOfCard} ?`, [
      {
        text: 'Cancel',
        onPress: () => {
          //np action will be taken if user press the cancel  
        },
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            //when press yes
            //this id of the document will be deleted.
            await firestore().collection('dummy').doc(cardId).delete();
            //set list was the updated list of array 
            //the set list parameter prevlist is accepting the item kf filtered array and if item.id is 
            // not present in the array then keep the item in the array and if its present then exclude it
            setList((prevList) => prevList.filter((item) => item.id !== cardId));
            //console.log(`${cardValue} deleted successfully`);
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    console.log('List State Updated:+++++++++++++++++++++++', list); // Log the updated state
  }, [list]);
  //=-----------------------------------------------------------------------------------------
  return (
    //-------------------------------------------------------------------------------------

    <View style={styles.container}>
    <ScrollView>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.gobackButton} onPress={() => navigation.goBack()}>
          {/* <Ionicon name="arrow-back-circle" size={60} color="#C19A6B" /> */}
        </TouchableOpacity>
        {/* <View style={styles.groupContainer}> */}
          {/* <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="name"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
            />
          </View> */}
          {/* <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="ingredient"
              placeholderTextColor="gray"
              value={ingredient}
              onChangeText={setIngredient}
            />
          </View> */}
          {/* <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="calory"
              placeholderTextColor="gray"
              value={calaries}
              onChangeText={setCalaries}
            />
          </View> */}
          <View style={styles.cardContainer}>
          {list.map((item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onLongPress={() => handleCardLongPress(item.id, item.name)}
      onPress={() => navigateToUpdateScreen(item.id)}
    >
     
   

                <Text style={styles.textcolor}>{item.ingredient}</Text>
                <Text style={styles.textcolor}>{item.calaries}</Text>
                <Text style={styles.textcolor}>{item.name}</Text>
                
              </TouchableOpacity>
            ))}
          </View>
        {/* </View> */}
      </View>
    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
 
  textcolor:{
fontSize:20,
color:"red"
  },
container: {
  flex: 1,
},
imageContainer: {
  height: '40%',
  width: '100%',
  position: 'relative',
},
gobackButton: {
  position: 'absolute',
  top: 20,
  left: 20,
},
groupContainer: {
  alignItems: 'center',
  marginTop: 20,
},
inputContainer: {
  width: '80%',
  marginVertical: 5,
},
input: {
  backgroundColor: 'white',
  padding: 10,
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 30,
},
cardContainer: {
  marginVertical: 20,
  
},
card: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 30,
  marginVertical: 10,
},
});