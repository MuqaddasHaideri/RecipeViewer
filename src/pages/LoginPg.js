import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'

import logoLogin from '../../images/letsCookLogin-removebg-preview.png'
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useNavigation, StackActions } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/MaterialIcons';


export default function LoginPg() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showTip, setTip] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const SignUpPgNavigator = () => navigation.navigate("SignUpPg");
    const ForgotPasswordPgNavigator = () => navigation.navigate("ForgotPasswordPg");
    //authentication code
    //login function for signIn the user
    const handleLogin = async () => {
        try {
            if (email.length > 0 && password.length > 0) {
                const isUserLogin = await auth().signInWithEmailAndPassword(email, password);
                setEmail('');
                setPassword('');
                setMessage('');
                //
                //checking the object of user login and check if the user email is verified or not 
                if (isUserLogin.user.emailVerified) {
                    alert('Login Successful!');
                    //if he is verified then give access to next pages 
                    navigation.navigate("RecipeList");
                } else {
                    //if email is not verfied then send email again and donot give access and if the state  if s]cahange to login then change it again to logout
                    alert("you Email is not verified yet! please check the email to verify yourself.");
                    await auth().currentUser.sendEmailVerification();
                    await auth().signOut();
                }

            } else {
                setTip(true);
            }
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <View style={styles.frame}>
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
                    <TouchableOpacity activeOpacity={0.5} onPress={ForgotPasswordPgNavigator} >
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.btnContainer} onPress={handleLogin}>
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

    frame: {
        backgroundColor: "#F5F5DC",
        flex: 1,
    },
    imageContainer: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 200,
        height: 200,

    },
    loginText: {
        fontSize: 80,
        alignItems: "center",
    },

    forgotPassword: {
        //backgroundColor:"red",
        fontSize: 20,
        fontWeight: "bold",
        color: "#C19A6B",
        textAlign: "right",
        paddingRight: 50,
        marginTop: -5,
    },
    MainContainer: {

        //height: 500,
        flex: 1,
        paddingVertical: 40
        // alignItems:"center",
        // justifyContent:"center"
    },
    label: {
        fontSize: 50,
        color: "#5C4033",
        fontWeight: 'bold',
        fontFamily: "georgia",

    },
    btnContainer: {
        borderRadius: 20,
        backgroundColor: "#C19A6B",
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
        color: "#C19A6B",
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
        backgroundColor: "#C19A6B",
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

        marginTop: 5,
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