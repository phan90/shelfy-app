import React from 'react';
import { Notifications } from 'expo';
import { createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';

const AppNavigator = createSwitchNavigator({
  Login: {
    screen: LoginScreen,
  },
  Main: {
    screen: HomeScreen,
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
