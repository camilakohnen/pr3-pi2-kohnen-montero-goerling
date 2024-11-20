import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import PostForm from '../components/PostForm'

export default class CreatePost extends Component {
    render() {
        return (
          <View>
            <PostForm navigation={this.props.navigation}/>
          </View>
        )
      }
}

