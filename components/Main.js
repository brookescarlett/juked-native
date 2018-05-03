import React, { Component } from 'react';
import {NavigatorIOS, View, Text } from 'react-native'

import Playlist from './Playlist'

export default class Main extends Component{
  render(){
    return(
      <View style={{marginTop: 100}}>
        <Playlist />
      </View>
    )
  }
}
