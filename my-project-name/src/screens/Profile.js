import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20,
        marginVertical: 5 ,
        alignItems : 'center',
        width: '100%',
        textAlign: 'center',
        padding: 10,
        flexDirection: 'center'
    }
})