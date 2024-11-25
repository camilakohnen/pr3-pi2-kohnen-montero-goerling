import { Text, View , TextInput, StyleSheet, TouchableOpacity, CheckBox} from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class FormularioLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '', //mail
            password: '', // contraseña
            error: '',
            rememberMe: false,
        }
    }


    componentDidMount(){
        auth.onAuthStateChanged( (user) => {
            if(user){
                this.props.navigation.navigate('Home')
            }  
        })
    }

    login(email, password){
        if(!email.includes('@')){
            this.setState( {error: "Ingrese un formato de mail correcto"})
            return 
        }

        if(password.length < 6){
            this.setState( {error: "Ingrese una contraseña mas larga"})
            return 
        }

        //De auth puedo sacar dos metodos: 
        //createUserWithEmailAndPassword
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            this.props.navigation.navigate('Home')
            console.log('ingreso correctamente') 
            console.log(user);

        })
        .catch((err) => {
            if (err.code === 'auth/internal-error') {
                this.setState({ error: "Mail o contraseña incorrecto" });
            }
            console.log('Hubo un error:', err);
        });

        //signinUserWithEmailAndPassword  --> para este caso hago lo mismo pero con este metodo     
        }

  render() {
    return (
      <View>
        <View style={styles.container}>
            <TextInput
                style={styles.input} // si no agrego no se ve nada 
                keyboardType='default'
                placeholder='Ingresa tu nombre de usuario'
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
                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>
            }
            <View style={styles.rememberMeContainer}>
                    <CheckBox
                        value={this.state.rememberMe}
                        onValueChange={(newValue) => this.setState({ rememberMe: newValue })}
                    />
                    <Text style={styles.rememberMeText}>Recordarme</Text>
            </View>
            <TouchableOpacity 
                style={styles.boton}
                onPress={() => this.login(this.state.email, this.state.password)}
            >
                <Text style={styles.texto}>Login</Text>
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
    },
    errorText: {
        color: 'red',
        marginVertical: 5,
        textAlign: 'center',
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    rememberMeText: {
        marginLeft: 5,
    },
})