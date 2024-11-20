import {View, Text, TouchableOpacity} from 'react-native';
import {Component } from 'react';
import {StyleSheet } from 'react-native';
import Contador from '../components/Contador';
import FormularioHome from '../components/CommentForm';

class Home extends Component{ 
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    touchCorto(){
        console.log('Me clikearon');
    }

    irARegister(){
        this.props.navigation.navigate('register')
    }

    irAlLogin(){
        this.props.navigation.navigate('login')
    }
    
    irABuscador(){
        this.props.navigation.navigate('buscador')
    }

    render(){
        
    }
    
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 5 ,
        alignItems : 'center',
        width: '100%',
        textAlign: 'center',
        padding: 10,
        flexDirection: 'center'
    },
    boton:{
        backgroundColor : 'grey',
        width: '100%',
        borderRadius : 4, 
        padding : 4,
        marginBottom: 10,
    },
    texto : {
        textAlign: 'center',
        fontWeight: 'bold',
    }
})

export default Home;