import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import Constants from '../constants';

export default class MovieDetailsController extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      movie: null,
      loading: true
    };
  }
  
  componentWillMount() {
    this.fetchData();
  }
  
  fetchData = async () => {
    var url = Constants.BASE_URL + 'movie/' + this.props.navigation.state.params.id; 
    var state = await fetch(url)
          .then(function(response){
            return response.json();
          })
          .then(function(json){ 
            return { movie: json, loading: false };
          })
          .catch(function(error) {  
            return { 
                errorMessage: "Something went wrong",
                loading: false };
          }); 
    this.setState(state);
  }
  
  render() { 
    if (this.state.errorMessage) {
      return (
        <View style = {styles.container}>
          <Text style = { styles.errorText }>
              { this.state.errorMessage }
          </Text>
        </View>
      );
    } else if(this.state.loading){
       return (
        <View style = { styles.container }>
           <ActivityIndicator
             style = { styles.loading }
             size = "large" animating />
        </View>
       );
    }  
    return (
      <View style = { styles.container }>
        <Image 
          source = {{ uri: Constants.IMAGE_URL + Constants.LARGE_IMAGE_SIZE + this.state.movie.image }}
          style = { styles.image }
          resizeMode = "contain"
        />
        <View style = { styles.viewText }>
          <Text style = { styles.title }>
            { this.state.movie.title }
          </Text>
          <Text style = { styles.releaseDate }>
            { this.state.movie.releaseDate }
          </Text>
          <Text style = { styles.description }>
            { this.state.movie.description }
          </Text>
        </View>
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
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    paddingTop: 10,
    textAlign: 'center'
  },
  releaseDate: {
    fontSize: 14,
    paddingTop: 10,
    marginLeft: 10,
    textAlign: 'center'
  },
  description: {
    lineHeight: 20,
    margin: 10,
    textAlign: 'center'
  },
  image: {
    flex: 2,
    height: undefined,
    width: undefined,
  },
  viewText: {
    flex: 2,
    flexDirection: 'column'
  }
});