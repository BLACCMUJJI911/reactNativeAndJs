import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import ToastManager, { Toast } from 'toastify-react-native'
import firestore, { doc } from "@react-native-firebase/firestore"

export default function SignUp({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    const AsyncStorage = useAsyncStorage("");


    const handleChangeEmail = (e) => {
        setEmail(e);
    };

    const handleChangePassword = (e) => {
        setPassword(e);
    };

    const handleChangeName = (e) => {
        setName(e);
    };

    const handleChangeLastName = (e) => {
        setLastName(e);
    };

    const handleChangeAddress = (e) => {
        setAddress(e);
    };

    const handleChangePhone = (e) => {
        setPhone(e);
    };

    const handleSignIn = e => {
        e.preventDefault();
        navigation.navigate("Signin")
    }

    const signUp = async () => {


        try {

            if (email == "" || password == "" || name == "" || phone == "" || address == "" || lastName == "") {
                Toast.warn("Fill All the Required Fields")
            }

            else {

                await auth().createUserWithEmailAndPassword(email, password)
                    .then(async (userCredential) => {

                        const uid = userCredential.user.uid;
                        const userCollection = firestore().collection("User Info")

                        await AsyncStorage.setItem("uid" + uid);
                        console.log(uid)

                        let data = {
                            uid: uid,
                            name: name,
                            lastName: lastName,
                            email: email,
                            password, password,
                            phoneNumber: phone,
                            address: address
                        }

                        userCollection.doc(uid).set(data)

                        Toast.success("User Registered Successfully");
                        await navigation.navigate("Home");

                    });

            }


        }

        catch (error) {

            if (error.code === "auth/email-already-in-use") {

                Toast.warn("Email already registered ");

            }

            else if (error.code === 'auth/invalid-email') {

                Toast.warn('Invalid Email');

            }

            else {

                Toast.error("An Error occurred", error)
            }

        }



    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaProvider>
                <ToastManager style={{ marginTop: -80, padding: 10, height: "12%", width: "80%", zIndex: 100 }} />
                <View style={styles.mainContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.signUpTxt}>SignUp</Text>
                        <TextInput style={styles.input} value={name} onChangeText={e => handleChangeName(e)} placeholder="Name" />
                        <TextInput style={styles.input} value={lastName} onChangeText={e => handleChangeLastName(e)} placeholder="Last Name" />
                        <TextInput style={styles.input} value={phone} onChangeText={e => handleChangePhone(e)} placeholder="Phone" keyboardType="numeric" />
                        <TextInput style={styles.input} value={address} onChangeText={e => handleChangeAddress(e)} placeholder="Address" />
                        <TextInput style={styles.input} value={email} onChangeText={e => handleChangeEmail(e)} placeholder="Email" autoCapitalize="none" />
                        <TextInput style={styles.input} value={password} onChangeText={e => handleChangePassword(e)} secureTextEntry={true} placeholder="Password" autoCapitalize="none" />
                        <TouchableOpacity onPress={handleSignIn} activeOpacity={.6}>
                            <Text style={styles.HaveAcc}>Have An Account? Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} activeOpacity={0.9} onPress={signUp}>
                            <Text style={{ textAlign: "center" }}>SignUp</Text>
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
        height: "90%",

    },

    btn: {

        marginTop: 50,
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
    },

    HaveAcc: {
        color: "#2b47d7",
        textDecorationLine: 'underline',
    }
});
