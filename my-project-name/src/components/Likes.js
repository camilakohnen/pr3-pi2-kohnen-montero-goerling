import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase'
import { db, auth } from '../firebase/config'

export default class likes extends Component {
    constructor(props){
        super(props)
        this.state = {
            esCopado: false,
        }
    }

    actualizarEsCopado(idDocumento){
        db
        .collection('users')
        .doc(idDocumento)
        .update({
           arrCopados: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( () => {
            this.setState({
                esCopado: true
            })
        })
    }

    yaNoEsCopado(idDocumento){
        db
        .collection('users')
        .doc(idDocumento)
        .update({
            arrCopados: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                esCopado:false
            })
        })
    }

  render() {
    return (
        <View>
            <Text>{this.props.item.data.owner}</Text>  
            <Text>{this.props.item.data.username}</Text>
            {
                this.state.esCopado ?
                <TouchableOpacity
                onPress={()=> this.yaNoEsCopado(this.props.item.id)}
                style={
                    styles.btn2
                }
                >
                    <Text>Ya no me parece Copado</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    onPress={()=> this.actualizarEsCopado(this.props.item.id)}
                    style={
                        styles.btn
                    }
                >
                    <Text>Es Copado</Text>
                </TouchableOpacity>
            }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    btn: {
     padding: 10,
     backgroundColor: 'green'
    },
    btn2: {
        padding: 10,
        backgroundColor: 'red'
    } 
 })