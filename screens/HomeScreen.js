import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity, 
  Image
} from 'react-native';
import * as firebase from 'firebase'
import {  Avatar } from 'react-native-elements'
// import CameraScreen from './CameraScreen'
import ApiKeys from '../config/ApiKeys'
import 'firebase/firestore';
import { ImagePicker, FileSystem, Permissions } from 'expo';


const firebaseApp = firebase.initializeApp(ApiKeys.firebaseConfig)
const auth = firebaseApp.auth();
const db = firebase.firestore()
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default class HomeScreen extends React.Component {

  render() {
    console.log(firebase.auth())
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Avatar
            size="large"
            rounded
            source={{ uri: firebase.auth().currentUser.photoURL }}
            activeOpacity={0.7}
          />
          <Text>Welcome back {firebase.auth().currentUser.displayName}!
          </Text>
          <TouchableOpacity onPress={() => this.pickImage()}>
            <Image
              source={require('../assets/images/camera.png')}
              style={styles.camera}
            />
          </TouchableOpacity>

        </ScrollView>
        {/* < CameraScreen navigate={this.props.navigation.navigate} */}
        />
      </View>
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
          this.props.navigation.navigate('Image')
        })
        .catch((error) => {
          Alert.alert('Upload failed')
        })
    }
  }

  uploadImage = async (uri, imageName, userID) => {
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
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
