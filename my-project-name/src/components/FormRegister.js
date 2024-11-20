import { Text, View , TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { auth , db } from '../firebase/config'

export default class FormularioRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            error: ''
        }
    }

    registrarse(username, email, password){
        if(username.length < 2){
            this.setState( {error: "Ingrese un username"})
            return 
        }
        
        if(!email.includes('@')){
            this.setState( {error: "Ingrese un formato de mail correcto"})
            return 
        }

        if(password.length < 6){
            this.setState( {error: "Ingrese una contraseña mas larga"})
            return 
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            if(user){
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    username: username, 
                    imagenPerfil: '',
                })
                .then(() => {
                    console.log('llega a la redireccion')
                    this.props.navigation.navigate('anidada')} )
            }
        })
        .catch( err => {
            if (err.code === "auth/email-already-in-use"){
                this.setState({error: 'el mail ya esta en uso'})
            }
        }
        );
    }

  render() {
    return (
      <View style={styles.container}>
            <TextInput
                style={styles.input} // si no agrego no se ve nada 
                keyboardType='default'
                placeholder='Cree el nombre de usuario'
                onChangeText={(texto) => this.setState({ username: texto, error: ''})} // actualizo el valor del estado 
                value={this.state.username} // lo obtengo 
            />
            <TextInput
                style={styles.input} // si no agrego no se ve nada 
                keyboardType='default'
                placeholder='Ingrese el mail'
                onChangeText={(texto) => this.setState({ email: texto, error: ''})}
                value={this.state.email}
            />
            <TextInput
                style={styles.input} // si no agrego no se ve nada  
                keyboardType='default'
                placeholder='Ingrese la contraseña'
                secureTextEntry={true}
                onChangeText={(texto) => this.setState({ password: texto, error: ''})}
                value={this.state.password}
            />
            {
                this.state.error !== '' &&
                <Text>
                    {this.state.error}
                </Text>
            }
            <TouchableOpacity 
                style={styles.boton}
                onPress={() => this.registrarse(this.state.username, this.state.email, this.state.password)}
            >
                <Text style={styles.texto}>Registrarse</Text>
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
    boton:{
        backgroundColor : '#fca3b7',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius : 4, 
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ff69b4',
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