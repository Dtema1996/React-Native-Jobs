import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='description' size={30} color={tintColor} />
    }
  })

  renderCard(job) {
    const initialRegion = {
      longitude: -122,
      latitude: 37,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    }

    return (
      <Card title={job.title}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >

          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.created_at}</Text>
        </View>
        <Text>
          {`${job.description.substr(0, 150)}...`}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card
        title="No More Jobs!"
      >
        <Button
          title="Back To Map"
          icon={{ name: 'my-location' }}
          buttonStyle={{ backgroundColor: "#03A9F4"}}
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 15 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent:'space-around',
    marginBottom: 10
  }
}

function mapStateToProps(state) {
  return { jobs: state.jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);
