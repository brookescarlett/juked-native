import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'

import {View, Text, Image } from 'react-native'

class Player extends Component {

  state = {
    currentlyPlaying: ""
  }

  componentDidMount = () => {
    setInterval(this.checkPlaying, 2000)
  }

  checkPlaying = () => {
    console.log('here');
    let currentlyPlaying = ""

    var ref = firebase.database().ref().child(`${this.props.chatroom}`).child('songs')
    ref.orderByKey().limitToFirst(1).on("child_added", function(snapshot) {
      if (snapshot.val().currentlyPlaying === true) {
        console.log(snapshot.val());
        currentlyPlaying = snapshot.val()
        console.log(currentlyPlaying);
      }
    })

    this.setState({
      currentlyPlaying: currentlyPlaying
    })
  }

  renderCurrentlyPlaying = () => {
    if (this.state.currentlyPlaying === "") {
    } else {
      return(
          <View style={{width: 300, flex: 1, alignItems: 'center'}}>
            <Image style={{width: 300, height: 300}} source={{uri: this.state.currentlyPlaying.datum.album.images[1].url}}/>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: 'rgb(30, 29, 70)'}}>{this.state.currentlyPlaying.song}</Text>
            <Text style={{fontSize: 16, color: 'rgba(255, 255, 255, 0.9)'}}>{this.state.currentlyPlaying.artist}</Text>
          </View>
      )
    }
  }

  componentWillUnmount = () => {
    clearInterval(setInterval(this.checkPlaying, 2000));
  }


  render() {
    return(
      <View style={{flex: 1, alignItems: 'center'}}>

        <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
          <Image source={require('./images/bg2.001.jpeg')} style={{resizeMode: 'cover'}}></Image>
        </View>

        <View style={{ flex: 1, backgroundColor: 'transparent'}}>
          <Text style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: 36, marginTop: 92, fontWeight: 'bold', marginBottom: 16}}>Now Playing</Text>
          {this.state.currentlyPlaying !== "" ? this.renderCurrentlyPlaying() : null}
        </View>

      </View>
    )
  }
}

function mapStateToProps(state) {
  return {songs: state.songs, currentUser: state.currentUser, playlistID: state.playlistID, currentlyPlaying: state.currentlyPlaying, DJ: state.DJ, chatroom: state.chatroom}
}

export default connect(mapStateToProps)(Player)
