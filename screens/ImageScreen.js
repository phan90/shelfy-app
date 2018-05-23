import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FileSystem } from 'expo';
import * as firebase from 'firebase'
import 'firebase/firestore';
import ApiKeys from '../config/ApiKeys'
import { Header } from 'react-native-elements'

export default class ImageScreen extends React.Component {
    state = {
        image: '',
    };

    // componentDidMount() {
    //     FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
    //         this.setState({
    //             photos
    //         });
    //     });
    // }

    componentDidMount () {
        firebase.firestore().collection('test').doc('sSVMJ1jbKUnEb2XlfU8W').onSnapshot(doc => {
            console.log(`Recieved doc snapshot: ${doc.data().image}`)
            this.setState({
                image: doc.data().image
            })
        }, err => {
            console.log(err)
        })
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
        console.log(this.props.navigation, 'navigate')
        console.log(this.state.image, 'imagescreen state')
        return (
            <View style={styles.container}>
            <View style={styles.container} >
                {this.state.image && <Image
                    style={styles.image}
                    source={{
                        uri: this.state.image,
                    }}
                />}
            </View>
                <Header
                    leftComponent={{ icon: 'home',  color: '#fff' , onPress: () => {this.props.navigation.navigate('Main')}}}
                    centerComponent={{ text: 'These are your reccommended books', style: {color: '#fff'}}}
                />
            
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
        flex: 1,
        // opacity: 0.2
    }
});
