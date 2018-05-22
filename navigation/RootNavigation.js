import React from 'react';
import { Notifications } from 'expo';
import { createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import ImageScreen from '../screens/ImageScreen';
import ARCamera from '../screens/ARCamera';

const AppNavigator = createSwitchNavigator({
  Login: {
    screen: LoginScreen,
  },
  Main: {
    screen: HomeScreen,
}, 
  Image: {
    screen: ImageScreen
  }, 
  Camera: {
    screen: ARCamera
  }
});

export default class RootNavigation extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
