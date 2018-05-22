import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as firebase from 'firebase'
import {  Avatar } from 'react-native-elements'
import CameraScreen from './CameraScreen'


export default class HomeScreen extends React.Component {

  render() {
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
        </ScrollView>
        < CameraScreen navigate={this.props.navigation.navigate}
        />
      </View>
    );
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
