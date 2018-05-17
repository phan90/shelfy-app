// import React from 'react';
// import { Button, Image, View } from 'react-native';
// import { ImagePicker } from 'expo';

// export default class ImagePicker2 extends React.Component {
//   state = {
//     image: null,
//   };

//   render() {
//     let { image } = this.state;

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Button
//           title="Pick an image from camera roll"
//           onPress={this._pickImage}
//         />
//         {image &&
//           <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       </View>
//     );
//   }

//   _pickImage = async () => {
//     console.log('image picker launching')
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     console.log(result, 'jnskjdnasldnas');

//     if (!result.cancelled) {
//       this.setState({ image: result.uri });
//     }
//   };
// }




import React from 'react';
import { Button, Image, View, Alert, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase'

export default class Camera extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <Button
          title="Choose image..."
          onPress={this._pickImage}
        />
      </View>
    );
  }

  _pickImage = async () => {
    console.log(firebase.auth().currentUser, 'hello jac')
    let result = await ImagePicker.launchCameraAsync()
    if (!result.cancelled) {
      this.uploadImage(result.uri, new Date().getTime())
        .then(() => {
          Alert.alert('Success');
        })
        .catch((error) => {
          Alert.alert('Upload failed')
        })
    }
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    // console.log(blob, 'blob')

    const ref = firebase.storage().ref().child('images/' + imageName)
    // console.log(ref, 'ref')
    return ref.put(blob)
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
})



