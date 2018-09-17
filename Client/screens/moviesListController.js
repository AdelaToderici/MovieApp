import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View
} from 'react-native';

import MovieCell from './movieCell';
import Constants from '../constants';

export default class MoviesListController extends Component {

  state = {
    data: [],
    page: 1,
    loading: false,
  };
  
  componentWillMount() {
    this.fetchData();
  }
  
  fetchData = async () => {
    this.setState({ loading: true });
    const url = Constants.BASE_URL + 'movies?page=' + this.state.page;
    var result = await fetch(url)
          .then(function(response){
            return response.json();
          })
          .catch(function(error) {  
            return { 
                errorMessage: "Something went wrong",
                loading: false };
          }); 
    
    if(result.errorMessage)
    {
      this.setState(result);
    }
    else
    {
      this.setState( state => ({
          data: [...state.data, ...result],
          loading: false 
        }));
    }
  }
  
  handleEnd = () => {
    this.setState( state => ({ page: state.page + 1 }), () => this.fetchData());
  }
  
  _renderItem = ({ item }) => (
    <MovieCell
      id = { item.id }
      title = { item.title }
      releaseDate = { item.releaseDate }
      thumbnail = { Constants.IMAGE_URL + Constants.SMALL_IMAGE_SIZE + item.image }
      navigation = { this.props.navigation }
    />
  );
  
  _keyExtractor = (item, index) => item.id.toString();
  
  render() {
    if (this.state.errorMessage) {
      return (
        <View style = {styles.container}>
          <Text style = { styles.errorText }>
              { this.state.errorMessage }
          </Text>
        </View>
      );
    }
    return (
      <View style = {styles.container}>
        <FlatList
          data = { this.state.data }
          keyExtractor = { this._keyExtractor }
          onEndReached = { () => this.handleEnd() }
          onEndReachedThreshold = { 0 }
          ListFooterComponent = { () => <ActivityIndicator size = "large" animating /> }
          renderItem = { this._renderItem }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  errorText: {
    paddingTop: 20,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});