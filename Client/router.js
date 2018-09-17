import React from 'react'
import { Dimensions, Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import MoviesListController from './screens/moviesListController'
import MovieDetailsController from './screens/movieDetailsController'

let screen = Dimensions.get('window');

export const MoviesStack = createStackNavigator({
  MoviesListController: {
    screen: MoviesListController,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Movies',
    }),
  },
  MovieDetailsController: {
    screen: MovieDetailsController,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Movie Details',
    }),
  },
});

export const createRootNavigator = () => {
  return createStackNavigator(
    {
      MoviesStack: {
        screen: MoviesStack,
        navigationOptions: ({ navigation }) => ({
          gesturesEnabled: false,
        })
      },
    },
    {
      headerMode: "none",
      mode: "modal"
    }
  );
};