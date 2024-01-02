import {

    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    StatusBar

}

    from "react-native"

import { SafeAreaProvider } from "react-native-safe-area-context"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useState } from "react";
import { auth } from "@react-native-firebase/auth"
import ToastManager, { Toast } from "toastify-react-native";


export default function SignIn({ navigation }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const AsyncStorage = useAsyncStorage("");

    // console.log(AsyncStorage.getItem())
if(AsyncStorage.getItem("uid").value) {
    navigation.replace("Home")
}

    const signIn = async e => {

        try {

            await auth().signInWithEmailAndPassword(email, password).then((creditnals) => {
                const uid = creditnals.user.uid;
                console.log(`User ${uid} successfully logged in!`);
                AsyncStorage.setItem("uid" + uid)

                navigation.replace("Home")

            })

        }
        catch (error) {
            Toast.error(`No User Found With Email ${email}`)
        }

    }

    const handleChangeEmail = e => {
        setEmail(e)
    }

    const handleChangePassword = e => {
        setPassword(e)
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaProvider>
                <ToastManager style={{ marginTop: -70, padding: 5, height: "15%", width: "90%", zIndex: 100 }} />
                <View style={styles.mainContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.signUpTxt}>SignIn</Text>
                        <TextInput style={styles.input} value={email} onChangeText={(e) => handleChangeEmail(e)} placeholder="Email" autoCapitalize="none" />
                        <TextInput style={styles.input} value={password} onChangeText={(e) => handleChangePassword(e)} secureTextEntry={true} placeholder="Password" autoCapitalize="none" />
                        <TouchableOpacity style={styles.btn} activeOpacity={0.9} onPress={signIn}>
                            <Text style={{ textAlign: "center" }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaProvider>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "black",
        width: "100%",
        height: "100%",
        backgroundColor: "#3e4038"
    },

    formContainer: {

        backgroundColor: "#CDA309",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "black",
        width: "88%",
        marginTop: 10,
        borderRadius: 20,
        rowGap: 10,
        padding: 10,
        height: "80%"

    },

    btn: {

        marginTop: 60,
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 8,
        width: "30%",


    },

    input: {

        width: "70%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 8

    },
    signUpTxt: {
        marginBottom: 40,
        fontSize: 50,
        color: "#97661E",
        fontWeight: "300"
    }
});
