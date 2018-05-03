import React, { Component } from 'react';
import {NavigatorIOS, View, Text } from 'react-native'

import Playlist from './Playlist'
import UserList from './UserList'

export default class Main extends Component{
  render(){
    return(
      <View style={{marginTop: 100}}>
        {/* <Filter /> */}
        <Playlist />
        <UserList />
        {/* <Player /> */}
      </View>
    )
  }
}
