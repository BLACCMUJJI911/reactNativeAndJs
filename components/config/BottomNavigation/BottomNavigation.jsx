import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ActivityHome from "../../../screens/activityHome/activityHome"
import { NavigationContainer } from "@react-navigation/native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Text } from "react-native-paper"
import { Image } from "react-native"
import iconHome from "./home.png"
import Notification from "../../../screens/Notification/notification"
import Messages from "../../../screens/Messages/Messages"
import Profile from "../../../screens/Profile/Profile"

export default function BottomNavigation() {

  const Bottom = createBottomTabNavigator()

  return (
    <>



      <Bottom.Navigator>

        <Bottom.Screen name="HOME" component={ActivityHome} options={{
          headerShown: false, tabBarIcon: () => {
            <Image src={iconHome} />

          }

        }}>
        </Bottom.Screen>

        <Bottom.Screen name="Notifications" component={Notification} options={{
          headerShown: false, tabBarIcon: () => {
            <Image src={iconHome} />

          }

        }}>

        </Bottom.Screen>

        <Bottom.Screen name="Messages" component={Messages} options={{
          headerShown: false, tabBarIcon: () => {
            <Image src={iconHome} />

          }

        }}>

        </Bottom.Screen>
        <Bottom.Screen name="Profile" component={Profile} options={{
          headerShown: false, tabBarIcon: () => {
            <Image src={iconHome} />

          }

        }}>

        </Bottom.Screen>

      </Bottom.Navigator>



    </>
  )
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AnimatedTabBar, {TabsConfigsType} from 'curved-bottom-navigation-bar';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Search from '../../../screens/Search/Search';
// const tabs: TabsConfigsType = {
//     Home: {
//         icon: ({ progress, focused }) => /* Icon Component */,
//         renderTitle: ({ progress, title }) => /* Custom reanimated Component */
//     },
//     Profile: {
//         icon: ({ progress, focused }) => /* Icon Component */,
//         renderTitle: ({ progress, title }) => /* Custom reanimated Component */
//     },
// }

// const Tab = createBottomTabNavigator();

// export default function BottomNavigation() {
//   return (
//   <SafeAreaProvider>
//     <NavigationContainer>
//       <Tab.Navigator
//         tabBar={props => (
//           <AnimatedTabBar tabs={tabs} {...props} />
//         )}
//       >
//         <Tab.Screen
//           name="HOME"
//           component={Search}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={Search}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   </SafeAreaProvider>
//   )
// }