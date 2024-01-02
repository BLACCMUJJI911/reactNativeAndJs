import React from 'react'
import {View, StyleSheet} from "react-native"
import {useEffect} from "react"
import { Text } from 'react-native-paper'

export default function Splash({navigation}) {

useEffect(()=>{

    setTimeout(() => {

        navigation.replace("Signup")

    },3000)
    // console.log(navigation)

},[])

    return (
        <>

        <View style={styles.mainContainer}>

        <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>Welcome To APP</Text>

        </View>

        </>
    )
}

const styles = StyleSheet.create({

    mainContainer:{

        flex:1,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"

    }

})