import React from 'react';
import {createAppContainer} from 'react-navigation';
import {Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import logo from './assets/logo.png';

import Feed from './pages/Feed';
import New from './pages/New';

export default createAppContainer(
  createStackNavigator(
    {
      Feed,
      New,
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#000',
        headerTitle: () => <Image source={logo} />,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      },
      mode: 'modal',
    },
  ),
);
