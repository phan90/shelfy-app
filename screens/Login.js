import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Text, Linking } from 'react-native';
import Expo from 'expo';
import { androidClientId, iosClientId , APIKEY} from '../config';
import * as firebase from 'firebase'
import axios from 'axios';

export default class Login extends React.Component {

    signInWithGoogleAsync = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId,
                iosClientId,
                scopes: ['profile', 'email', 'https://www.googleapis.com/auth/books'],
            });
            if (result.type === 'success') {
                // console.log(result, 'books????')
                this.props.navigation.navigate('Main')
                const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
                firebase.auth().signInAndRetrieveDataWithCredential(credential)
                const options = { "headers": { "Authorization": `Bearer ${result.accessToken}` }}
                return axios.get('https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/volumes', options
            ).then(({data}) => {
                const authors = data.items.reduce((acc, book) => acc.concat(book.volumeInfo.authors), [])
                console.log(authors)
                firebase.firestore().collection('response').doc(firebase.auth().currentUser.providerData[0].uid).set({ authors})
            })
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e)
            return { error: true };
        }
    }


    render() {
        return (
            <View style={styles.container} >
                <Image
                    source={require('../assets/images/shelfy-logo.png')}
                    style={styles.logo} />
                <TouchableOpacity onPress={this.signInWithGoogleAsync}>
                    <Image
                        source={require('../assets/images/google.png')}
                        style={styles.google}
                    />
                </TouchableOpacity>
                <Text style={styles.text}>You will need to have a Google Books account to use this app, please sign up
                        <Text style={{ color: 'blue' }}
                        onPress={() => Linking.openURL('https://books.google.co.uk')}> here
                        </Text>.
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 170,
    },
    logo: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
    },
    google: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
    },
    text: {
        width: '100%',
        height: 140,
        position: 'absolute',
        bottom: 0,
        fontSize: 15, 
        textAlign: 'center',
    },
});
