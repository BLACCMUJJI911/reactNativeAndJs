import {View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native"

export default function Notification() {
    return (
        <>
        
        <View>
            <TextInput style={{color:"black", borderWidth:1, borderColor:"black", marginHorizontal:20}} placeholder="New Prompt"/>
        </View>
        
        </>
    )
}