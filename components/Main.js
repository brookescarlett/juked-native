import React, { Component } from 'react';
import {NavigatorIOS, View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Playlist from './Playlist'
import UserList from './UserList'
import Player from './Player'
import Filter from './Filter'

export default class Main extends Component {

  render(){
    return(
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'blue'}}>
        <Filter />
        <Playlist />
        <Player />
      </View>
    )
  }
}
