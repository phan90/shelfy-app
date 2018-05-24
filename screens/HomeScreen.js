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
import axios from 'axios'
// import {google} from 'googleapis';

const firebaseApp = firebase.initializeApp(ApiKeys.firebaseConfig)
const auth = firebaseApp.auth();
const db = firebase.firestore()
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default class HomeScreen extends React.Component {
  // componentDidMount() {
  //     // return axios.get(`https://books.google.com/books?uid=${firebase.auth().currentUser.providerData[0].uid}&source=gbs_lp_bookshelf_list`)
  //   // return axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves`, {
  //   //   headers: { Authorization: 'Bearer ' + '1/lpH3LpFy5thKUwDHih0EckqvzmgOPXSJxFRgEI0zzqc'}
  //   // })
  //   //     .then(res => console.log(res.data, 'google books')
  //   //   )
  //   //   .catch(err => console.log(err)
  //   // )

  //   // async function getUserInfo(accessToken) {
  //   return axios.get('https://www.googleapis.com/books/v1/mylibrary/bookshelves', {
  //     headers: { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyOWYyNjlmM2YwNmFmMWU5M2RhYzY3MDYzOTc3ZjcxM2E3N2YxOWUifQ.eyJhenAiOiI1OTE1NjUzMzg0MDctNjBpcjlhMW9ia3RpcmhsbTMwNnQ0bnBvbWNkdHM2YXIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1OTE1NjUzMzg0MDctNjBpcjlhMW9ia3RpcmhsbTMwNnQ0bnBvbWNkdHM2YXIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ3NTQ3MDY3ODYyMjIxODEwMjkiLCJlbWFpbCI6ImthcmVucGhhbjkwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVFVlOGZxaVBxd3lHOXZENzNhTU1rZyIsImV4cCI6MTUyNzE2MDMyMiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNTI3MTU2NzIyLCJuYW1lIjoiS2FyZW4gUCIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWJSaHdJNXhtVGtjL0FBQUFBQUFBQUFJL0FBQUFBQUFBUUtvL3YwVGg4aVNTS25rL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJLYXJlbiIsImZhbWlseV9uYW1lIjoiUCIsImxvY2FsZSI6ImVuIn0.hZ5zBg67F7ZET1QdlUWeP4dOPM2nSAShq_IX1hFNkbSqJgPapqXmMmqXuev0Q_TTa7CCni5LnPM9-EJp6uBHTru8jvNjhGcxT8X1zcShqQ_6CBjGRRdumVf-L9MvEhCsVSRLofnGSB5kvlSnS5tKeQQK6OZcn8GjJh64PiNznzuxlioN6YnDC1VNHdATHtwM0J5iY8g7Ey9OfY2Ip47BHO1ZMlmYZWVr71UvG-MjRYt6Q9kL4KQYcKxh_tYsuNXfFyb1un-jF2iVrYbnJMyfZ6HlMzCTC61ovxF3jG03KCPHL1FJBJdUTeE4yspbAXx3Rh_FVbrPhtxTPl8Pcwoayw` },
  //     });

  //     // return userInfoResponse;
  //   }

  //   // return google.books('v1').mylibrary.bookshelves.volumes.list({
  //   //   auth: firebase.auth().currentUser.accessToken, 
  //   //   shelf: '0'
  //   // })
  //   //   .then(res => console.log(res))
  //   //   .catch(err => console.log(err))
  // // }

  render() {

    // console.log(firebase.auth().currentUser, 'user')
    return (
      <View style={styles.container}>
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}> */}
        <Avatar
          size={200}
          rounded
          source={{ uri: firebase.auth().currentUser.photoURL }}
          activeOpacity={0.7}
        />
        <Text>Welcome back {firebase.auth().currentUser.displayName}!
          </Text>
        <TouchableOpacity onPress={() => this.takePhoto()}>
          <Image
            source={require('../assets/images/camera.png')}
            style={styles.camera}
          />
        </TouchableOpacity>

        {/* </ScrollView> */}
        />
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
    paddingTop: 30,
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
  }
});
