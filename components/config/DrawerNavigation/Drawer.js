// import Home from "../../../screens/Home/Home";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import SignUp from "../../../screens/Signup/SignUp";
// import SignIn from "../../../screens/Signin/SignIn";
// import { View, Text } from "react-native"

// export default function Drawers() {

//     const Drawer = createDrawerNavigator()

//     return (
//         <>

//             <Drawer.Navigator >

//                 <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
//                 <Drawer.Screen name="Signup" component={SignUp}></Drawer.Screen>
//                 <Drawer.Screen name="Signin" component={SignIn}></Drawer.Screen>

//             </Drawer.Navigator>


//         </>
//     )

// }

import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import Home from "../../../screens/Home/Home";
import SignUp from "../../../screens/Signup/SignUp";
import SignIn from "../../../screens/Signin/SignIn";

export default function Drawers() {
    const Drawer = createDrawerNavigator();

    // Custom drawer content component
    const CustomDrawerContent = (props) => {
        return (
          <DrawerContentScrollView {...props}>
            <LinearGradient colors={['#4285f4', '#34a853']} style={styles.drawerHeader}>
              {/* Your user profile picture */}
              <View style={styles.profilePicture}></View>
              <Text style={styles.drawerHeaderText}>Your App Name</Text>
            </LinearGradient>
            {/* Regular drawer items */}
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        );
      };

    return (
        <>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                drawerStyle={{
                    backgroundColor: "#F0F0F0", // Background color of the drawer
                    width: 240, // Width of the drawer
                }}
            >
                <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
                <Drawer.Screen name="Signup" component={SignUp}></Drawer.Screen>
                <Drawer.Screen name="Signin" component={SignIn}></Drawer.Screen>
            </Drawer.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: "#4285f4", // Background color of the header
        height: 80, // Height of the header
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16,
    },
    profilePicture: {
        width: 40, // Adjust the width of the profile picture
        height: 40, // Adjust the height of the profile picture
        borderRadius: 20, // Make it round (assuming it's a circular profile picture)
        marginRight: 16,
    },
    drawerHeaderText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        
    },
    linearBg:{
        
    }
});
