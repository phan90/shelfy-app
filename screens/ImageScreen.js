import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FileSystem } from 'expo';
import * as firebase from 'firebase'
import 'firebase/firestore';
import ApiKeys from '../config/ApiKeys';
import { Header } from 'react-native-elements';
import { Bars } from 'react-native-loader';

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
    componentDidMount() {
        firebase.firestore().collection('response').doc(firebase.auth().currentUser.uid).set({ image: '' })

        firebase.firestore().collection('response').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
            // console.log(`Recieved doc snapshot: ${doc.data().image}`)
            console.log(doc.data().image, 'doc data')
            if (doc.data().image !== '') {
                this.setState({
                    image: doc.data().image
                })
            }
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
                        {/* <View style={styles.loader}>
                            <Bars size={40} color='#FDAAFF' />
                        </View> */}
                        <Image 
                            source={require('../assets/images/bookgif.gif')}
                            style={styles.image}
                            />
                    </View>
                }
                {/* <Header
                    leftComponent={{ icon: 'home', color: '#fff', onPress: () => { this.props.navigation.navigate('Main') } }}
                    centerComponent={{ text: 'These are your recommended books', style: { color: '#fff' } }}
                /> */}

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
    },
    loader: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
