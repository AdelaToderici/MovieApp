import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  Button,
  ScrollView,
  Text,
  Dimensions,
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
    
    this.onPress = this.onPress.bind(this);
  }
  
  componentWillMount() {
    this.fetchData();
  }
    
  onPress() {
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
          <View style={styles.buttonContainer}>
            <Button onPress={this.onPress} title="Reload" color="#2E9298" accessibilityLabel="Tap on Me"/>
          </View>
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
        <ScrollView style = { styles.scrollView }>
          <Image 
            source = {{ 
              uri: Constants.IMAGE_URL + Constants.LARGE_IMAGE_SIZE + this.state.movie.image,
              //cache: 'only-if-cached',
            }}
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  }, 
  errorText: {
    paddingTop: 20,
    fontSize: 16,
    textAlign: 'center',
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
  scrollView:{
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    fontWeight: '600',
    textAlign: 'left'
  },
  releaseDate: {
    fontSize: 16,
    paddingTop: 10,
    marginLeft: 10,
    fontWeight: '400',
    textAlign: 'left'
  },
  description: {
    lineHeight: 20,
    fontWeight: '400',
    margin: 10,
    textAlign: 'left'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 1.79
  },
  viewText: {
    //justifyContent:'flex-start',
    flex: 2,
    flexDirection: 'column',
    marginBottom: 2
  }
});
