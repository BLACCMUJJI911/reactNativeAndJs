import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../../screens/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../splash_screen/splash";
import SignIn from "../../../screens/Signin/SignIn";
import SignUp from "../../../screens/Signup/SignUp";
import MainHome from "../../../screens/Home/MainHome/mainhome";
import Drawers from "../../config/DrawerNavigation/Drawer";

export default function Stack() {

    const Tab = createStackNavigator()

    return (
        <>
            <NavigationContainer>

                <Tab.Navigator>
                    <Tab.Screen name="Splash" component={Splash} options={{ headerShown: false }}></Tab.Screen>
                    <Tab.Screen name="Drawer" component={Drawers}></Tab.Screen>
                    <Tab.Screen name="Home" options={{headerStyle:{backgroundColor:"yellow"}, headerTitleContainerStyle:{paddingHorizontal:"auto"}}} component={Home}></Tab.Screen>
                    <Tab.Screen name="mainHome" component={MainHome} options={{ headerShown: false }}></Tab.Screen>
                    <Tab.Screen name="Signup" options={{headerStyle:{backgroundColor:"#CDA400"}}} component={SignUp}></Tab.Screen>
                    <Tab.Screen name="Signin" component={SignIn}></Tab.Screen>
                </Tab.Navigator>

            </NavigationContainer>
        </>
    )

}