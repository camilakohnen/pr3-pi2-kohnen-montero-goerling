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

    filtrado(text) {
        const filtered = this.state.users.filter((user) => {
            return user.data.username && 
                   user.data.username.toLowerCase().includes(text.toLowerCase());
        });
    
        this.setState({
            searchText: text,       // guardo el texto escrito
            filteredUsers: filtered, // muestro solo los usuarios filtrados
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

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f9f9f9', 
        padding: 20, 
        alignItems: 'center',
    },
    searchInput: {
        height: 45, 
        width: '100%', 
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        paddingHorizontal: 15, 
        marginVertical: 15,
        fontSize: 16, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    texto: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 15,
    },
    userCard: {
        backgroundColor: '#fff', 
        padding: 15, 
        marginBottom: 10, 
        borderRadius: 8, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: '100%', 
    },
    volverText: {
        color: '#fff', 
        fontSize: 16,
        fontWeight: 'bold',
    },
});
