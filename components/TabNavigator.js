import React, { Component } from 'react';
import {NavigatorIOS, View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Playlist from './Playlist'
import UserList from './UserList'
import Player from './Player'

export default TabNavigator({
  Playlist: { screen: Playlist },
  Users: { screen: UserList },
  Player: { screen: Player },
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Playlist') {
          iconName = `ios-shuffle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Users') {
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
      activeTintColor: 'purple',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
