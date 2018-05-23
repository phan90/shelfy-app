import React from 'react';
import { StyleSheet, View } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import * as firebase from 'firebase'
import ApiKeys from './config/ApiKeys'
import { Header } from 'react-native-elements'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig)
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user != null) {
          console.log("We are authenticated now!");
        }
      });
    }
  }
  render() {
    const { container } = styles;
    return (
      <View style={container}>
        {/* <Header
          centerComponent={{ text: 'SHELFY', style: { color: '#fff' } }}
        /> */}
        <RootNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd'
  }
});
