import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'

import logoLogin from '../../images/letsCook-removebg-preview.png'
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useNavigation, StackActions} from '@react-navigation/native';

export default function LoginPg() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showTip, setTip] = useState(false);

    const SignUpPgNavigator=() =>navigation.navigate("SignUpPg");
     const ForgotPasswordPgNavigator=() =>navigation.navigate("ForgotPasswordPg");
     //____________________________________________________________________
     //authentication code 
     const handleLogin = async () => {
        try {
            if (email.length > 0 && password.length > 0) {
                const isUserLogin = await auth().signInWithEmailAndPassword(email, password);
                setEmail('');
                setPassword('');
                setMessage('');
                navigation.dispatch(StackActions.replace('RecipeList'));
            } else {
                setTip(true);
            }
        } catch (err) {
            setMessage(err.message);
        }
    };
      
    //____________________________________________________________________

    return (
        <View>
            <ScrollView>
            {/* <TouchableOpacity style={styles.Gobackbutton} onPress={() => navigation.goBack()}>
                <Text style={styles.goBtnText}>Go Back</Text></TouchableOpacity> */}
            <View style={styles.imageContainer}>
                <Image source={logoLogin} style={styles.image} />
            </View>
            <View style={styles.MainContainer}>
                <View style={styles.loginText} >
                    <Text style={styles.label} >Login</Text>
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
                            placeholder="Password"
                            placeholderTextColor="gray"
                            value={password}
              onChangeText={value => setPassword(value)}
                            secureTextEntry
                        />
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity activeOpacity={0.5} onPress={ForgotPasswordPgNavigator} >
                    <Text  style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity> 

                <TouchableOpacity activeOpacity={0.5} style={styles.btnContainer} onPress={ handleLogin}> 
                    <Text style={styles.signIn}>Login</Text>
                </TouchableOpacity>
                 
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.noAccYet}>No account yet?</Text>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Text style={styles.signupText} onPress={SignUpPgNavigator}>SignUp</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.OrContainer}>
                    <Text style={styles.OrLabel}>OR</Text>
                    <TouchableOpacity style={styles.btnGuest}>
                        <Text style={styles.guestLabel}>Continue as a guest</Text>
                    </TouchableOpacity>
         
                </View>

            </View>
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

    // Gobackbutton: {
    //     width: 100,
    //     height: 40,
    //     backgroundColor: "#FFC76C",
    //     top: 20,
    //     left: 20,
    //     borderRadius: 5,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: "black"
    // },
    // goBtnText: {
    //     color: "black",
    //     fontWeight: "bold",
    //     fontSize: 20
    // },
    imageContainer: {
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center'

    },
    image: {
        width: 200,
        height: 200,

    },
    loginText: {
        fontSize: 80,
        alignItems: "center",
    },

    forgotPassword:{
        //backgroundColor:"red",
        fontSize:20,
        fontWeight:"bold",
        color: "#FAAB2A",
     textAlign:"right",
     paddingRight:50,
     marginTop:-5,
    },
    MainContainer: {

        height: 500,
        paddingTop: 40
        // alignItems:"center",
        // justifyContent:"center"
    },
    label: {
        fontSize: 30,
        color: "black",
        fontWeight: 'bold',
    },
    inputGroup: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10
    },
    container: {
        
        width: "80%",
        padding: 5,

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
    signIn: {
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
    bottomTextContainer: {


        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"


    },
    noAccYet: {

        fontSize: 20,
        color: "black"
    },

    signupText: {
        color: "#FAAB2A",
        padding: 5,
        fontSize: 23,
        fontWeight: "bold"
    },
    OrContainer: {
        alignItems: "center",
        padding: 10

    },
    OrLabel: {
        fontWeight: "bold",
        color: "black",
        fontSize: 25,

    },
    btnGuest: {
        backgroundColor: "#FFC76C",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        width: 350,
        alignSelf: "center",

    },
    guestLabel: {
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