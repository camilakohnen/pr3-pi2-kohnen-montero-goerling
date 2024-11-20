import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'

export default class Register extends Component {
    constructor(props){
        super(props)
    }

    irAlLogin(){
        this.props.navigation.navigate('login')
    }

    goToAnidada(){
        this.props.navigation.navigate('anidada')
    }
    
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}> Registrate aqui</Text>
        <FormRegister navigation={this.props.navigation}/> 

        <TouchableOpacity
        onPress={()=> this.irAlLogin()}
        >
            <Text>Ya tengo cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={()=> this.goToAnidada()}
        >
            <Text>Ir a home</Text>
        </TouchableOpacity>
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
    },
    texto: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 15,
    },

})