import React, { Component } from 'react';
import {NavigatorIOS, View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Playlist from './Playlist'
import UserList from './UserList'
import Player from './Player'
import Filter from './Filter'

export default TabNavigator({
  Search: {screen: Filter},
  Playlist: { screen: Playlist },
  Guests: { screen: UserList },
  Player: { screen: Player },
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Playlist') {
          iconName = `ios-shuffle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Guests') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        } else if (routeName === 'Player') {
          iconName = `ios-play${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'rgb(30, 29, 70)',
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
