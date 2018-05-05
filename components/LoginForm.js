import React, { Component } from 'react';
import {NavigatorIOS, TabBarIOS, View, Image, TextInput, Text, PropTypes} from 'react-native'
import {Button, Footer, FooterTab, Icon} from 'native-base'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { SetDJ } from '../actions/actions.js'
import { SetChatroom } from '../actions/actions.js'
import { SetName } from '../actions/actions.js'
import TabNavigator from './TabNavigator.js'

import * as firebase from 'firebase'

class LogInForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: ''
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

      <View style={{flex: 1, alignItems: 'center', backgroundColor:' rgb(30, 29, 70)'}}>

        <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
          <Image source={require('./images/bg2.001.jpeg')} style={{resizeMode: 'cover'}}></Image>
        </View>

        <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
          style={{height: 40, width: 300, marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.4)', borderColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderRadius: 100}}
          placeholder="   Enter your name"
          onChangeText={(text) => this.setState({name: text})}
          />

          <TextInput
          style={{height: 40, width: 300, backgroundColor: 'rgba(255, 255, 255, 0.4)', borderColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderRadius: 100, marginBottom: 40}}
          placeHolderStyle={{color:'rgba(30, 29, 70, 1)', position: 'absolute'}}
          placeholder="   Enter your room name"
          onChangeText={(text) => this.setState({room: text})}
          />

          <Button block light onPress={this.onPressButton} style={{backgroundColor: 'rgb(30, 29, 70)', borderRadius: 100}}>
            <Text style={{color: 'rgba(255, 255, 255, 0.9)'}}>JOIN</Text>
          </Button>


          <View>

          </View>

        </View>

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
