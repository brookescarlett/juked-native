import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'

import {View, Text, Image } from 'react-native'

class Player extends Component {

  state = {
    currentlyPlaying: ""
  }

  componentWillReceiveProps = () => {
    let currentlyPlaying = ""

    var ref = firebase.database().ref().child(`${this.props.chatroom}`).child('songs')
    ref.orderByKey().limitToFirst(1).on("child_added", function(snapshot) {
      if (snapshot.val().currentlyPlaying === true) {
        currentlyPlaying = snapshot.val()
      }
    })

    this.setState({
      currentlyPlaying: currentlyPlaying
    })
  }

  // setBackground = () => {
  //   let bgImg = document.getElementById('bg-img')
  //   bgImg.style.backgroundImage = `url(${this.state.currentlyPlaying.datum.album.images[0].url})`
  // }

  renderCurrentlyPlaying = () => {
    if (this.state.currentlyPlaying === "") {
    } else {
      return(
          <View>
            <Image style={{width: 50, height: 50}} source={{uri: this.state.currentlyPlaying.datum.album.images[1].url}}/>
            <Text>{this.state.currentlyPlaying.song}</Text>
            <Text>{this.state.currentlyPlaying.artist}</Text>
          </View>
      )
    }
  }


  render() {
    return(
      <View>
        {this.state.currentlyPlaying !== "" ? this.renderCurrentlyPlaying() : null}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {songs: state.songs, currentUser: state.currentUser, playlistID: state.playlistID, currentlyPlaying: state.currentlyPlaying, DJ: state.DJ, chatroom: state.chatroom}
}

export default connect(mapStateToProps)(Player)
