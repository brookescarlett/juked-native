import React, { Component } from 'react';
import {NavigatorIOS, View, TextInput, Button, Text, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { SetDJ } from '../actions/actions.js'
import { SetChatroom } from '../actions/actions.js'
import { SetName } from '../actions/actions.js'
import TabNavigator from './TabNavigator.js'
import Main from './Main.js'

import * as firebase from 'firebase'


class LogInForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Enter your name',
      room: 'Enter your room name'
     };
  }

  onPressButton = (e) => {
    e.preventDefault()

    let newSongRef = firebase.database().ref(`${this.state.room}`).child('users').push()

    newSongRef.set({
      name: this.state.name,
      dj: false
    }, () => {
      this.props.SetName(this.state.name)
      this.props.SetChatroom(this.state.room)
      this.props.SetDJ(false)
      this.onForward()
    })
  }

  onForward = () => {
    const nextRoute = {
      component: TabNavigator,
      title: 'juked.',
      barTintColor: 'rgb(30, 29, 70)'
    }

    this.props.navigator.resetTo(nextRoute)
  }

  render() {

    return (
      <View style={{marginTop: 200}}>

        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({name: text})}
        value={this.state.name}
        />

        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({room: text})}
        value={this.state.room}
        />

        <Button onPress={this.onPressButton} title="Join" style={{width: 50, height: 40, backgroundColor: 'purple'}}>
        </Button>


      </View>
    );
  }
}


const mapStateToProps = state => {
  return {DJ: state.DJ, chatroom: state.chatroom, name:state.name}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    SetDJ, SetChatroom, SetName
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)
