import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from 'toastify-react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function MainScreen() {

    const [data, setData] = useState([]);

    AsyncStorage.getItem("uid")
    

    useEffect(() => {

        const fetchData = async () => {

            try {

                const querySnapshot = await firestore().collection('Admin Data').get();

                const fetchedData = [];

                querySnapshot.forEach((documentSnapshot) => {

                    const documentData = documentSnapshot.data();
                    fetchedData.push({ id: documentSnapshot.id, ...documentData });

                });

                setData(fetchedData);

                Toast.success("Refreshed Data")

            } catch (error) {

                Toast.error('Error fetching documents:', error);

            }

        };

        fetchData();

    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>

            <Image source={{ uri: item.imgUrl }} style={styles.cardImage} resizeMode="cover" />

            <Text style={styles.cardTitle}>{item.title || 'No Title'}</Text>
            <Text style={styles.cardContent}>{item.description || 'No Description'}</Text>

        </View>
    );

    return (
        <>
            <LinearGradient
                colors={['#FFD700', '#FF8C00']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ToastManager duration={500} style={{ marginTop: -80, padding: 10, height: "12%", width: "80%", zIndex: 100 }} />
                <Text style={styles.heading}>Recent Posts</Text>
                <View style={styles.container}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        numColumns={2}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        width: "100%",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"

    },

    heading: {

        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        marginTop:10

    },

    listContainer: {

        justifyContent: 'space-between',
        gap: 10,


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

});
