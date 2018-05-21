import React from 'react';
import { ScrollView, StyleSheet, Image, Text, Button, TouchableOpacity } from 'react-native';
import Expo from 'expo';
import {androidClientId, iosClientId} from '../config';
import * as firebase from 'firebase'

export default class Login extends React.Component {
    async signInWithGoogleAsync() {
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
            <ScrollView style={styles.container}>
                <Image
                    source={require('../assets/images/shelfie-logo.png')}
                    style={styles.logo} />
                <TouchableOpacity onPress={this.signInWithGoogleAsync.bind(this)}>
                    <Image
                        source={require('../assets/images/google.png')}
                        style={styles.logo}
                    />
                </TouchableOpacity>
            </ScrollView>
        );


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    logo: {
        width: 250,
        height: 150, 
        resizeMode: 'contain', 
        justifyContent: 'center',
        alignItems: 'center'

    }
});
