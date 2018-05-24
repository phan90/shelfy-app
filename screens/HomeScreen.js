import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import * as firebase from 'firebase'
import { Avatar } from 'react-native-elements'
import ApiKeys from '../config/ApiKeys'
import 'firebase/firestore';
import { ImagePicker, Permissions } from 'expo';

const firebaseApp = firebase.initializeApp(ApiKeys.firebaseConfig)
const auth = firebaseApp.auth();
const db = firebase.firestore()
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}> */}
        <Image
          style={styles.image}
          source={{ uri: firebase.auth().currentUser.photoURL }}
        />
        <Text>Welcome back {firebase.auth().currentUser.displayName}!
          </Text>

        {/* </ScrollView> */}
        <View style={styles.bottom}>
        <Text style={styles.text}>Take a pic
           </Text>
        <TouchableOpacity onPress={() => this.takePhoto()}>
          <Image
            source={require('../assets/images/camera.png')}
            style={styles.camera}
          />
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  takePhoto = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync()
    if (!result.cancelled) {
      this.uploadImage(result.uri, firebase.auth().currentUser.providerData[0].uid)
        .then(() => {
          console.log('success')
          this.props.navigation.navigate('Image')
        })
        .catch((error) => {
          Alert.alert('Upload failed')
        })
    }
  }

  uploadImage = async (uri, userID) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`upload/${userID}.jpg/`)
    return ref.put(blob)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  // contentContainer: {
  //   paddingTop: 30,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // }
  camera: {
    width: 100,
    height: 100
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    // width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: 0,
    fontSize: 20
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  }
});
