import React, {Component} from 'react'
import {NavigatorIOS, View, TextInput, Button, Text, PropTypes } from 'react-native'

export default class User extends Component {

  render(){
    return(
      <View>
        <Text>@{this.props.datum.name}</Text>
      </View>
    )
  }
}
