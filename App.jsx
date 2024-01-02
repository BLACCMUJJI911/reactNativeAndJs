import { StyleSheet } from "react-native";
import Stack from "./components/common/StackNavigation/stack";


export default function App(){
  return(
    <>
  {/* <SafeAreaProvider style={styles.container}> */}

{/* <Drawer/> */}
<Stack/>


  {/* </SafeAreaProvider> */}



    
    </>
  )
}

const styles = StyleSheet.create({

  container:{

    display:"flex",
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    background:"black"

  }

})