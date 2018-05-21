import React, { Component } from 'react';
import { Text, StyleSheet, Button, ScrollView, Image, Container, ImageContainer, TouchableOpacity } from 'react-native';
import { Constants} from 'expo';
import * as firebase from 'firebase'
import data from './data'

export default class UserProfile extends Component {
   

    render() {
        // console.log(data[0])
        // console.log(firebase.auth().currentUser.displayName, 'user id user profile')
        return (

            <ScrollView horizontal={true}>
                    {data.map((book, index) => (
                        // <TouchableOpacity
                        //     key={index}>
                    <Image style={{ width: 150, height: 250 }}
source={{ uri:'https://images-na.ssl-images-amazon.com/images/I/513CDGVQhCL._SX302_BO1,204,203,200_.jpg'}} key={index} />
                        // </TouchableOpacity>
                    ))}
            </ScrollView>
//             <ScrollView horizontal={true}>

//                 <Text>Child 1</Text>
//                 <Text>Child 2</Text>
//                 <Text>Child 3</Text>
//                 <Image style={{ width: 66, height: 58 }}
// source={{ uri:'https://images-na.ssl-images-amazon.com/images/I/513CDGVQhCL._SX302_BO1,204,203,200_.jpg'}} />
//                 <Image style={{ width: 66, height: 58 }}
// source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/513CDGVQhCL._SX302_BO1,204,203,200_.jpg' }} />
//                 <Image style={{ width: 66, height: 58 }}
// source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/513CDGVQhCL._SX302_BO1,204,203,200_.jpg' }} />

//             </ScrollView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    }, 
    contentContainer: {
        paddingTop: 30,
    },
});
