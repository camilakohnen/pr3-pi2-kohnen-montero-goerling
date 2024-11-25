import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Post from '../components/Post';
import { auth } from '../firebase/config'


export default class Home extends Component {
    componentDidMount(){
        auth.onAuthStateChanged( (user) => {
            if(user === null){
                this.props.navigation.navigate('Login')
            }  
        })
    }
    
    render () {
        return (<Post/>) 
    }  
}