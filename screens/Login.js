import React from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
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
            <View style={styles.container} >
            <ScrollView contentContainerStyle={styles.contentContainer}>
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
            </View>
        );


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 150, 
        resizeMode: 'contain', 
     

    }
});
