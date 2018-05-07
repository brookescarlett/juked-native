import React, {Component} from 'react'
import * as firebase from 'firebase'
import {connect} from 'react-redux'
import User from './User'
import UUID from 'uuid'

import {NavigatorIOS, View, TextInput, Image, ScrollView, Button, Text, PropTypes } from 'react-native'

class Userlist extends Component {

  state = {
    usersArray: [],
    dj: ""
  }

  componentDidMount = () => {
    firebase.database().ref().child(`${this.props.chatroom}`).child('users').orderByKey().on('child_added', snap => {
      if (snap.val().dj === true) {
        this.setState({
          dj: snap.val()
        })
      } else {
        console.log(snap.val());
        this.setState(prevState => ({
          usersArray: [...prevState.usersArray, snap.val()]
        }))
      }
    })
  }

  renderUsers = () => {
    return this.state.usersArray.map(user => <User key={ UUID() } datum={user}/>)
  }


  render(){
    return(

      <View style={{flex: 1, alignItems: 'center'}}>

        <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
          <Image source={require('./images/bg2.001.jpeg')} style={{resizeMode: 'cover'}}></Image>
        </View>

        <View style={{ flex: 1, backgroundColor: 'transparent'}}>
          <Text style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: 36, marginTop: 92, fontWeight: 'bold', marginBottom: 16, fontFamily: 'Avenir-Black'}}>Guests</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: 'rgb(30, 29, 70)', fontFamily: 'Avenir-Book'}}>{this.state.dj !== "" ? `DJ: ${this.state.dj.name}` : "to play music, you'll need a dj!"}</Text>
          <ScrollView style={{ flex: 1, backgroundColor: 'transparent'}}>
            {this.renderUsers()}
          </ScrollView>
        </View>

      </View>
    )
  }


}

const mapStateToProps = state => {
  return {chatroom: state.chatroom}
}

export default connect(mapStateToProps)(Userlist)
