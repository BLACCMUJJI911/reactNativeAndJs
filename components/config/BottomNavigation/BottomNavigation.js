import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MainScreen from "../../../screens/MainScreen/Screen"
import VideoPosts from "../../../screens/VideoPosts/VideoPosts"
import { Image } from "react-native"
import HomeIcon from "../../../assets/homeIcon.png"
import VideoIcon from "../../../assets/videoIcon.png"

export default function BottomNavigation() {

    const Bottom = createBottomTabNavigator()

    return (
        <>

          

                <Bottom.Navigator>

                <Bottom.Screen name="ScreenHome" component={MainScreen} options={{headerShown:false,tabBarLabel:"Home",
                tabBarIcon:({size,focused,color}) => {
                    return (
                      <Image
                        style={{ width: size, height: size, tintColor: focused ? '#C0910E' : color, }}
                        source={HomeIcon}
                      />
                    );
                    },
                 headerStyle:{backgroundColor:"yellow"}}}></Bottom.Screen> 
                 {/* <Bottom.Screen name="AddBtn" component= /> */}
                <Bottom.Screen name="VideoPosts" component={VideoPosts} options={{headerShown:false, tabBarIcon:({size,focused,color}) => {
                    return (
                      <Image
                        style={{ width: size, height: size, tintColor: focused ? '#C0910E' : color, }}
                        source={VideoIcon}
                      />
                    );
                    },}}></Bottom.Screen>

                </Bottom.Navigator>

       

        </>
    )
}