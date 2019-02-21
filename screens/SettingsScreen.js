import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          icon={{ name: 'delete-forever' }}
          buttonStyle={{ backgroundColor: "#F443366" }}
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}


export default connect(null, { clearLikedJobs })(SettingsScreen);
