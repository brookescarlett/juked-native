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
    return(
      <View style={{marginTop: 200}}>
        <Text>@{this.props.datum.user}</Text>
        <Text>{this.props.datum.song}</Text>
        <Text>{this.props.datum.artist}</Text>

        <Icon.Button name="like" backgroundColor="#3b5998" onPress={this.handleUpVote}>
          <Text>{this.props.datum.upVote}</Text>
        </Icon.Button>

        <Icon.Button name="dislike" backgroundColor="#3b5998" onPress={this.handleDownVote}>
          <Text>{this.props.datum.downVote}</Text>
        </Icon.Button>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {chatroom: state.chatroom, songs: state.songs, playPause: state.playPause}
}

export default connect(mapStateToProps)(SongItem)
