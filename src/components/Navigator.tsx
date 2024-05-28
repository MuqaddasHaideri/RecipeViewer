import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import WelcomeHomePg from "../pages/WelcomeHomePg";


import LoginPg from "../pages/LoginPg";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import RecipeList from "../pages/RecipeList";
// const { Navigator, Screen } = createNativeStackNavigator();
const NavigatorScreen = () => {

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{header:()=>null}} name="Home" component={WelcomeHomePg} />
                <Stack.Screen options={{header:()=>null}} name="Login" component={LoginPg} />
                <Stack.Screen options={{header:()=>null}} name="RecipeList" component={RecipeList} />
              
                <Stack.Screen  options={{header:()=>null}}  name="SignUpPg" component={SignUp} />
                <Stack.Screen  options={{header:()=>null}}  name="ForgotPasswordPg" component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>

    )

}
export default NavigatorScreen;