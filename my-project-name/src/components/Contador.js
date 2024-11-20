import {View, Text, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';
import { Component } from 'react';

class Contador extends Component{ 
    constructor(props){
        super(props)
        this.state = {
            contador: 0,
        }
    }

    contador(){
        this.setState({
            contador: this.state.contador + 1
        })
    }
    touchCorto(){
        console.log('Me clikearon');
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>El valor del contador es {this.state.contador} </Text>
                <TouchableOpacity 
                    style={styles.boton}
                    onPress={ () => this.contador()}
                >
                    <Text style={styles.texto}> Contar</Text>
                </TouchableOpacity>
            </View>
        )
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
        backgroundColor : 'green',
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

export default Contador;