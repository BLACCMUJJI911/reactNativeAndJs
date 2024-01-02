import { useEffect, useState } from "react"
import {

    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ScrollView,
    FlatList

}

    from "react-native"
import LinearGradient from "react-native-linear-gradient"
import firestore from "@react-native-firebase/firestore"
import ToastManager, { Toast } from "toastify-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import v4 from "uuid"
import Video from 'react-native-video';



export default function VideoPosts({navigation}) {

    const [videoTitle, setVideoTitle] = useState("")
    const [link, setLink] = useState("")
    const [getData, setGetData] = useState([])

    let uid = AsyncStorage.getItem("uid").value

    let vidData = {
        videoTitle,
        videoLink: link,
        uid
    }

    const fetchVideoData = async () => {

        try {

            const querySnapshot = await firestore().collection('Videos').get();

            const fetchedData = [];

            querySnapshot.forEach((documentSnapshot) => {

                const documentData = documentSnapshot.data();
                fetchedData.push({ id: documentSnapshot.id, ...documentData });

            });

            setGetData(fetchedData);

            Toast.success("Refreshed Data")

        } catch (error) {

            Toast.error('Error fetching documents:', error);

        }

    }

    const renderItem = ({ item }) => (
        <View style={styles.card}>

            <Video
                source={{ uri: item.videoLink }}
                style={styles.cardVideo}
                resizeMode="cover"
                controls={true}
            />

            <Text style={styles.cardTitle}>{item.videoTitle || 'No Title'}</Text>
            <Text style={styles.cardContent}>{item.description || 'No Description'}</Text>

        </View>
    );


    useEffect(() => {

        fetchVideoData()

    }, [])

    const postVideo = e => {
        e.preventDefault();
        firestore().collection("Videos").doc(uid).set(vidData)

        Toast.success("Posted")


        // if (videoTitle && link) {
        //     vidCollection.add(vidData).then(()=>{
        //         Toast.success('Your Post has been submitted!')
        //         setVideoTitle("");
        //         setLink("");
        //         })
        //         .catch((err)=> {alert(err)})
        //         } else {
        //             Toast.warn("Please fill out all fields.")
        //             }

    }



    const handleChangeVideoTitle = e => {
        setVideoTitle(e)
    }

    const handleChangeVideoLink = e => {
        setLink(e)
    }

    // #B47d10

    return (
        <>


            <LinearGradient

                colors={['#C59639', '#Dda941']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>

                
                    <ToastManager />

                    <View style={styles.container}>

                        <Text style={{ color: "black", fontSize: 30, fontWeight: "bold" }}>Post Video</Text>

                        <View style={styles.form}>
                            <TextInput placeholderTextColor={"#Dfdedd"} style={styles.input} value={videoTitle} onChangeText={handleChangeVideoTitle} placeholder="Video Title" />
                            <TextInput placeholderTextColor={"#Dfdedd"} style={styles.input} value={link} onChangeText={handleChangeVideoLink} placeholder="Video Link" />
                            <LinearGradient
                                colors={['#FFD700', '#FF8C00']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.gradientRadius}
                            >

                                <TouchableOpacity onPress={postVideo} style={styles.btn} activeOpacity={.7}>
                                    <Text style={{ color: "black" }}>
                                        Add Video
                                    </Text>
                                </TouchableOpacity>

                                <View style={styles.videoOutput}>

                                </View>

                            </LinearGradient>
                        </View>

                    </View>
                
            </LinearGradient>
<View>

            <LinearGradient
                colors={['#FFD700', '#FF8C00']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                <Text style={styles.heading}>Recent Posts</Text>
                <View style={styles.container}>
                    <FlatList
                        data={getData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        numColumns={2}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            </LinearGradient>
            </View>

            {/* 
            Stopped Making Further just because it is being crashed on load video
             */}
            

        </>
    )
}

const styles = StyleSheet.create({

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        paddingVertical: "40%"
    },

    form: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        gap: 10,
        marginBottom: "20%"
    },

    input: {
        color: "black",
        padding: 8,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        width: "60%",
    },

    btn: {
        padding: 13,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },

    gradientRadius: {
        borderRadius: 15,
        width: "40%"
    },

    
    listContainer: {

        justifyContent: 'space-between',
        gap: 10,


    },

    heading: {

        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        marginTop:10

    },

    card: {

        flexBasis: '48%',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 8,
        backgroundColor: 'transparent',
        marginVertical: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        height: "100%",
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',

    },

    cardTitle: {

        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black',

    },

    cardImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },

    cardContent: {

        fontSize: 16,
        color: 'black',

    },

})