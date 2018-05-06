import React, {Component} from 'react'
import {View, TextInput, Button, Text, PropTypes } from 'react-native'

export default class User extends Component {

  render(){
    return(
      <View>
        <Text style={{fontSize: 16, color: 'rgba(255, 255, 255, 0.9)', width: 300, fontFamily: 'Avenir Next'}}>@{this.props.datum.name}</Text>
      </View>
    )
  }
}
