import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormularioLogin from '../components/FormLogin'


export default class Login extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('props de la screen', this.props)
    }

    irARegister(){
        this.props.navigation.navigate('register')
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Inicie sesion</Text>
        <FormularioLogin navigation={this.props.navigation}/>

        <TouchableOpacity
            onPress={() => this.irARegister()}
        >
            <Text>No tengo cuenta</Text>
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
