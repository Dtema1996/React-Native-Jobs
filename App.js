import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: {
        screen: WelcomeScreen,
        navigationOptions: { tabBarVisible: false }
      },
      auth: {
        screen: AuthScreen,
        navigationOptions: { tabBarVisible: false }
      },
      main: {
        screen: createBottomTabNavigator({
          map: MapScreen,
          deck: DeckScreen,
          review: {
            screen:createStackNavigator({
              review: ReviewScreen,
              settings: SettingsScreen
            })
          }
        }),
        navigationOptions: { tabBarVisible: false }
      }
    }, {
      lazy: true
    });

    const MainAppNavigator = createAppContainer(MainNavigator);

    return (
      <Provider store={store}>
        <MainAppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
