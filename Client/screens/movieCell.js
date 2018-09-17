import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class MovieCell extends Component {
  
  render() {
    return(
      <TouchableOpacity onPress = { () => this.props.navigation.navigate('MovieDetailsController', { id: this.props.id }) }>
        <View style = { styles.rowContainer }>
          <Image source = {{ uri: this.props.thumbnail }}
            style = { styles.thumbnail }
            resizeMode = "contain" />
          <View style = { styles.rowText }>
            <Text style = { styles.title } numberOfLines = {1} ellipsizeMode = { 'tail' }>
              { this.props.title }
            </Text>
            <Text style = { styles.releaseDate } numberOfLines = {1} ellipsizeMode = { 'tail' }>
              { this.props.releaseDate }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 100,
    padding: 0,
    marginRight: 0,
    marginLeft: 0,
    marginTop: 1,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1, },
    shadowColor: '#CCC',
    shadowOpacity: 1.0,
    shadowRadius: 1
  },
  title: {
    paddingLeft: 0,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777'
  },
  releaseDate: {
    paddingLeft: 0,
    marginTop: 5,
    fontSize: 14,
    color: '#777'
  },
  thumbnail: {
    paddingLeft: 10,
    marginTop: 10,
    height: 80,
    width: 80
  },
  rowText: {
    flex: 4,
    flexDirection: 'column'
  }
});