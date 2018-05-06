import React, { Component } from 'react'
import * as firebase from 'firebase'
import {NavigatorIOS, View, TextInput, Button, Text, PropTypes } from 'react-native'

import Icon from 'react-native-vector-icons/Foundation'

import { connect } from 'react-redux'

class SongItem extends Component {

  handleUpVote = (e) => {
      let id = this.props.datum.id
      let upVote = ++this.props.datum.upVote

      var updates = {}
      updates[`/${this.props.chatroom}/songs/` + id + '/upVote'] = upVote
      var updateVotes = firebase.database().ref().update(updates)

      this.checkVotes()
  }

  handleDownVote = (e) => {
      let id = this.props.datum.id
      let downVote = ++this.props.datum.downVote

      var updates = {}
      updates[`/${this.props.chatroom}/songs/` + id + '/downVote'] = downVote
      var updateVotes = firebase.database().ref().update(updates)

      this.checkVotes()
  }

  checkVotes = () => {
    let id = this.props.datum.id

    if (this.props.datum.upVote - this.props.datum.downVote <= -10) {
      var updates = {}
      updates[`/${this.props.chatroom}/songs/` + id ] = null
      var updateVotes = firebase.database().ref().update(updates)
    }
  }

  render(){
    let clear = 'rgba(255, 255, 255, 0)'
    return(
      <View style={{ flex: 1, backgroundColor: 'transparent', width: 300, marginBottom: 8}}>
        <Text style={{fontSize: 18, color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Avenir Next'}}>@{this.props.datum.user}</Text>
        <Text style={{fontSize: 18, color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Avenir Next'}}>{this.props.datum.song}</Text>
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row'}}>
          <Text style={{fontSize: 18, color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Avenir Next'}}>{this.props.datum.artist}</Text>

          <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end'}}>

            <Icon.Button name="like" backgroundColor="transparent" onPress={this.handleUpVote} underlayColor='rgba(255, 255, 255, 0)'>
              <Text style={{fontSize: 18, color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Avenir Next'}}>{this.props.datum.upVote}</Text>
            </Icon.Button>

            <Icon.Button name="dislike" backgroundColor="transparent" onPress={this.handleDownVote}>
              <Text style={{fontSize: 18, color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Avenir Next'}}t>{this.props.datum.downVote}</Text>
            </Icon.Button>
          </View>

        </View>

      </View>
    )
  }
}

function mapStateToProps(state) {
  return {chatroom: state.chatroom, songs: state.songs, playPause: state.playPause}
}

export default connect(mapStateToProps)(SongItem)
