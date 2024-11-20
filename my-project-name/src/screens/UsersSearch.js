import { Text, View , FlatList, TouchableOpacity, TextInput} from 'react-native'
import {StyleSheet } from 'react-native';
import React, { Component } from 'react'
import {db} from '../firebase/config'

export default class BuscadorUsers extends Component {
    constructor(props){
        super(props)
        this.state={
            users: [],
            filteredUsers: [],
            searchText: '',
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot((docs) => {
            let arrDocs = [];
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            this.setState({
                users: arrDocs,
                filteredUsers: arrDocs, // Inicialmente todos los usuarios
            });
        });
    }

    goToAnidada(){
        this.props.navigation.navigate('home')
    }
 
    filtrado(text) {
        const filtered = this.state.users.filter((user) => {
            // Asegúrate de que user.data.username existe antes de aplicar toLowerCase()
            return user.data.username && 
                   user.data.username.toLowerCase().includes(text.toLowerCase());
        });
    
        this.setState({
            searchText: text,       // Guarda el texto escrito
            filteredUsers: filtered, // Muestra solo los usuarios filtrados
        });
    }
    
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto} > Buscador de usuarios </Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre"
          value={this.state.searchText}
          onChangeText={(text) => this.filtrado(text)}
        />
        <FlatList
            data={this.state.filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={ ({item}) =>  <Text style={styles.userCard}> {item.data.username} </Text>} // viene destrucutrado 
        />

        <TouchableOpacity
            style={styles.volverButton}
            onPress={()=> this.goToAnidada()}
        >
            <Text>Volver a home</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa toda la pantalla
        backgroundColor: '#f9f9f9', // Fondo suave
        padding: 20, // Espaciado general
        alignItems: 'center',
    },
    searchInput: {
        height: 45, // Tamaño más grande para facilitar la escritura
        width: '100%', // Ocupa todo el ancho del contenedor
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        paddingHorizontal: 15, // Espaciado interno
        marginVertical: 15,
        fontSize: 16, // Fuente más legible
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Sombra sutil
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    texto: {
        fontSize: 20, // Tamaño más grande para el título
        fontWeight: 'bold',
        color: '#333', // Color de texto oscuro
        marginBottom: 15,
    },
    userCard: {
        backgroundColor: '#fff', // Fondo blanco para destacar cada usuario
        padding: 15, // Espaciado interno
        marginBottom: 10, // Separación entre tarjetas
        borderRadius: 8, // Bordes redondeados
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: '100%', // Ocupa todo el ancho
    },
    volverText: {
        color: '#fff', // Texto blanco
        fontSize: 16,
        fontWeight: 'bold',
    },
});
