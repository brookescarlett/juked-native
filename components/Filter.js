import React, { Component } from 'react'
import {View, TextInput, Image, Text, AlertIOS, Alert } from 'react-native'
import {Item, Input} from 'native-base'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'

import * as firebase from 'firebase'

import SongItem from './SongItem'
import bg from './images/bg2.001.jpeg'


class Playlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: '  Enter a request to @theDJ',
      dj: '',
      alertSong: ''
     }

     console.log(props.name);
  }

  componentDidMount = () => {
    this.getDJName()

    let name = this.props.name
    firebase.database().ref().child(`${this.props.chatroom}`).child('requests').orderByKey().on('child_changed', snap => {
      if (snap.val().user === name && snap.val().willBePlayed === 'true') {
        AlertIOS.alert(
          `Your request to ${this.state.dj} has been recognized!`,
          `@theDJ will add ${snap.val().song} to the queue`
        )
      }
    })

  }



  sendToDJ = () => {
    this.fetchFunction(this.state.filter)
  }

  getDJName = () => {
    firebase.database().ref().child(`${this.props.chatroom}`).child('users').orderByKey().on('child_added', snap => {
      if (snap.val().dj === true) {
        this.setState({
          dj: snap.val().name
        })
      }
    })
  }

  fetchFunction = (song) => {
    let newSongRef = firebase.database().ref(`${this.props.chatroom}`).child('requests').push()

    this.setState({
      filter: '  Enter a request to @theDJ'
    })
    newSongRef.set({
      song: song,
      user: this.props.name,
      willBePlayed: false,
      id: newSongRef.key
    }, () => {
      AlertIOS.alert(
        `Request sent to @${this.state.dj}`,
        `You have sent a request to play: ${song}`
      )
    })
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>

        <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
          <Image source={require('./images/bg2.001.jpeg')} style={{resizeMode: 'cover'}}></Image>

        </View>

        <View style={{ flex: 1, backgroundColor: 'transparent'}}>
          <Text style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: 36, marginTop: 150, marginLeft: 16, marginBottom: 16, textAlign: 'left', fontWeight: 'bold', fontFamily: 'Avenir-Black'}}>Suggest</Text>

          <TextInput placeholder="  Send a request to @theDJ" onChangeText={(text) => this.setState({filter: text})} onEndEditing={this.sendToDJ} style=
            {{backgroundColor: 'rgba(255, 255, 255, 0.4)', borderColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderRadius: 100, color: 'rgba(30, 29, 70, 1)', marginLeft: 16, marginRight: 16, width: 300, paddingTop: 8, paddingBottom: 8, fontSize: 14}} placeHolderStyle={{color:'rgba(30, 29, 70, 1)', position: 'absolute'}} />
        </View>

      </View>
    )
  }


}

const mapStateToProps = state => {
  return {name: state.name, chatroom: state.chatroom}
}


export default connect(mapStateToProps)(Playlist)
