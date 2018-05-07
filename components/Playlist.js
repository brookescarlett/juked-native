import React, { Component } from 'react'
import {ScrollView, View, Text, Image } from 'react-native'
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
        <View style={{flex: 1, alignItems: 'center'}}>

          <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
            <Image source={require('./images/bg2.001.jpeg')} style={{resizeMode: 'cover'}}></Image>
          </View>

          <View style={{ flex: 1, backgroundColor: 'transparent'}}>
            <Text style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: 36, marginTop: 92, fontWeight: 'bold', marginBottom: 16, fontFamily: 'Avenir-Black'}}>Playlist</Text>
            <ScrollView style={{ flex: 1, backgroundColor: 'transparent', marginBottom: 16}}>
              {this.renderStore()}
            </ScrollView>
          </View>

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
