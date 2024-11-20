import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class FormularioHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            comentario: ''
        }
    }

    enviarComentario(){
        if(
            this.state.comentario.length !== ''
        ){
                console.log('Este es el comentario')
                console.log(this.state.comentario)
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Comentarios</Text>
        <View>
            
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Que quieres comentar?'
                onChangeText={(texto) => this.setState({ comentario: texto}) }
                value={this.state.comentario}
            />
            <TouchableOpacity
                style={styles.boton}
                onSubmit={() => this.enviarComentario()}
            >
                <Text style={styles.texto}>
                    Comentar
                </Text>
            </TouchableOpacity>
        </View>
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
    boton:{
        backgroundColor : '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius : 4, 
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginBottom: 10
    },
    texto : {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth:1, 
        borderStyle: 'solid',
        borderRadius: 6,
        borderColor: '#ccc',
        marginVertical: 10
    }
})