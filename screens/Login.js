import React from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity, View, Text, Linking } from 'react-native';
import Expo from 'expo';
import { androidClientId, iosClientId } from '../config';
import * as firebase from 'firebase'

export default class Login extends React.Component {
    signInWithGoogleAsync = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId,
                iosClientId,
                scopes: ['profile', 'email'],
            });
            if (result.type === 'success') {
                this.props.navigation.navigate('Main')
                const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
                firebase.auth().signInAndRetrieveDataWithCredential(credential)
            } else {
                return { cancelled: true };
            }
        } catch (e) {
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
                        </Text>
                    </Text>
            </View>
        );


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 80,
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
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0, 
        fontSize: 15
    },
});
