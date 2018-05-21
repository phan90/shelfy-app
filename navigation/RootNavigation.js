import React from 'react';
import { Notifications } from 'expo';
import { createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/Login';

const AppNavigator = createSwitchNavigator({
  Login: {
    screen: LoginScreen,
  },
  Main: {
    screen: MainTabNavigator,
}, 
},
{
  navigationOptions: (screenProps) => ({
    headerTitleStyle: {
      fontWeight: 'normal',
    }
  })
}

);

export default class RootNavigation extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
