import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { ImagePicker, FileSystem, Permissions } from 'expo';
import * as firebase from 'firebase'
import 'firebase/firestore';
import ApiKeys from '../config/ApiKeys'
import { Header } from 'react-native-elements'
import ImageScreen from './ImageScreen'

const firebaseApp = firebase.initializeApp(ApiKeys.firebaseConfig)
const auth = firebaseApp.auth();
const db = firebase.firestore()
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default class CameraScreen extends React.Component {

  // componentDidMount() {
  //   FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos')
  //   .catch(e => {
  //     console.log(e, 'Directory exists');
  //   });
  // }
  
  render() {
    return (
      <Header
        rightComponent={{ icon: 'camera', color: '#fff', onPress: () => this.pickImage() }}
      />
    );
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  pickImage = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync()
    if (!result.cancelled) {
      this.uploadImage(result.uri, new Date().getTime(), firebase.auth().currentUser.uid)
        .then(() => {
          console.log('success')
          // this.fetchData()
          // FileSystem.moveAsync({
          //   from: result.uri,
          //   to: `${FileSystem.documentDirectory}photos/Photo_1.jpg`
          // })
          this.props.navigate('Image')
        })
        .catch((error) => {
          Alert.alert('Upload failed')
        })
    }
  }

  // fetchData = async () => {
  //   db.collection('test').doc('sSVMJ1jbKUnEb2XlfU8W').get()
  //     .then(doc => {
  //       if (!doc.exists) {
  //         console.log('No such document!');
  //       } else {
  //         console.log('Document data:', doc.data());
  //       }
  //     })
  //     .catch(err => {
  //       console.log('Error getting document', err);
  //     });
  // }

  uploadImage = async (uri, imageName, userID) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`images/${userID}/` + imageName)
    return ref.put(blob)
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
})



