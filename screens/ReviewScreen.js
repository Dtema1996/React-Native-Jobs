import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Button,
  ScrollView,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';


class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Review Jobs",
    headerRight: (
      <View style={{ right: 5 }}>
        <Button
          title="Settings"
          onPress={() => {
            navigation.navigate("settings");
          }}
        />
      </View>
    )
  });

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const { company, created_at, url, title, id } = job;
      const initialRegion = {
        longitude: -122,
        latitude: 37,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      }

      return (
        <Card
          title={title}
          key={id}
        >
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{created_at}</Text>
            </View>
            <Button
              title="Apply Now!"
              color="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  italics: {
    fontStyle: 'italic'
  }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
