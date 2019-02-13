import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../component/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to jobApp'},
  { text: 'Set your location, then swipe away'}
];

class WelcomeScreen extends Component {
  render() {
    return (
      <Slides data={SLIDE_DATA} />
    );
  }
}

export default WelcomeScreen;
