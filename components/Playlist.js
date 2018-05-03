import React, { Component } from 'react'
import {NavigatorIOS, View, TextInput, Button, Text, PropTypes } from 'react-native'
import { AddSong, AddSongForRecs, UpdateSong, RemoveSong} from '../actions/actions.js'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import * as firebase from 'firebase'

import SongItem from './SongItem'


class Playlist extends Component {

  componentDidMount = () => {
    firebase.database().ref().child(`${this.props.chatroom}`).child('songs').orderByKey().on('child_added', snap => {
      this.props.AddSong(snap.val())
      this.props.AddSongForRecs(snap.val().spotifyID)
    })

    firebase.database().ref().child(`${this.props.chatroom}`).child('songs').orderByKey().on('child_changed', snap => {
      this.props.UpdateSong(snap.val())
    })

    firebase.database().ref().child(`${this.props.chatroom}`).child('songs').orderByKey().on('child_removed', snap => {
      this.props.RemoveSong(snap.val())
    })

  }

  renderStore = () => {
    return this.props.songs !== [] ? this.props.songs.map(song => {
      return <SongItem key={song.id} datum={song}/>
    }) : null
  }

  render(){
    return(
      <View>
        <Text>Playlist</Text>
        {this.renderStore()}
      </View>
    )
  }


}

const mapStateToProps = state => {
  return {songs: state.songs, currentUser: state.currentUser, playlistID: state.playlistID, chatroom: state.chatroom, seedTracks:state.seedTracks}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    AddSong, UpdateSong, RemoveSong, AddSongForRecs
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
