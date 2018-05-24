import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore';
import ApiKeys from '../config/ApiKeys';
import { Header } from 'react-native-elements';

export default class ImageScreen extends React.Component {
    state = {
        image: '',
    };

    componentDidMount() {
        firebase.firestore().collection('response').doc(firebase.auth().currentUser.providerData[0].uid).set({ image: '' })
        firebase.firestore().collection('response').doc(firebase.auth().currentUser.providerData[0].uid).onSnapshot(doc => {
            console.log(`Recieved doc snapshot: ${doc.data().image}`)
            if (doc.data().image !== '') {
                this.setState({
                    image: doc.data().image
                })
            }
        }, err => {
            console.log(err)
        })
        // firebase.firestore().collection('response').doc(firebase.auth().currentUser.uid).get()
        // .then(doc => {
        //     if (!doc.exists) {
        //         console.log('No such document!');
        //     } else {
        //         console.log('Document data:', doc.data().image);
        //         this.setState({
        //             image: doc.data().image
        //         })
        //     }
        // })
        // .catch(err => {
        //     console.log('Error getting document', err);
        // });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.image ?
                    <View style={styles.container} >
                        <Image
                            style={styles.image}
                            source={{
                                uri: this.state.image,
                            }}
                        />
                        <Header
                            leftComponent={{ icon: 'home', color: '#fff', onPress: () => { this.props.navigation.navigate('Main') } }}
                            centerComponent={{ text: 'These are your recommended books', style: { color: '#fff' } }}
                        />
                    </View> :
                    <View style={styles.container} >
                        <Image
                            source={require('../assets/images/loader.gif')}
                            style={styles.image}
                        />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    image: {
        flex: 1
    }
});
