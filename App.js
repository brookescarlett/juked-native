import React from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import manageData from './reducers/manageData.js'
import thunk from 'redux-thunk'

import * as firebase from 'firebase'

import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import LogInForm from './components/LoginForm'

const config = {
  apiKey: "AIzaSyBB6SOCalypw6mM1T_x98cXfJ1ASPKArlI",
  authDomain: "testing-firebase-47b58.firebaseapp.com",
  databaseURL: "https://testing-firebase-47b58.firebaseio.com",
  projectId: "testing-firebase-47b58",
  storageBucket: "testing-firebase-47b58.appspot.com",
  messagingSenderId: "186137424174"
}

const init = firebase.initializeApp(config)

const store = createStore(manageData, applyMiddleware(thunk))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          initialRoute={{
            component: LogInForm,
            title: 'juked.',
            translucent: true,
            titleTextColor: 'white',
            navigationBarHidden: true
          }}
          style={{flex: 1}}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
