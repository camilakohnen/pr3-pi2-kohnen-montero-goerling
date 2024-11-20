import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: null, // Datos del usuario
            posteos: [], // Lista de posteos del usuario
            loading: true, // Indicador de carga
        };
    }

    componentDidMount() {
        const usuarioActual = auth.currentUser;
        if (usuarioActual) {
            this.setState({ usuario: usuarioActual });

            // Cargar los posteos del usuario actual
            db.collection('posts') // Asegúrate de que esta sea tu colección de posteos
                .where('userEmail', '==', usuarioActual.email) // Filtrar por email del usuario
                .onSnapshot((snapshot) => {
                    const posteos = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    this.setState({ posteos, loading: false });
                });
        }
    }

    logout = () => {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate('login'); // Redirigir a la pantalla de login
            })
            .catch((error) => {
                console.error(error);
            });
    };

    borrarPosteo = (id) => {
      Alert.alert(
          'Confirmar',
          '¿Estás seguro de que quieres borrar este posteo?',
          [
              { text: 'Cancelar', style: 'cancel' },
              {
                  text: 'Aceptar',
                  onPress: () => {
                      db.collection('posts').doc(id).delete()
                          .then(() => {
                              Alert.alert('Éxito', 'Posteo borrado correctamente.');
                          })
                          .catch((error) => {
                              console.error('Error al borrar el posteo:', error);
                              Alert.alert('Error', 'No se pudo borrar el posteo.');
                          });
                  },
              },
          ],
      );
  };
  

    render() {
        const { usuario, posteos, loading } = this.state;

        return (
            <View style={styles.container}>
                {usuario ? (
                    <>
                        <Text style={styles.titulo}>Perfil</Text>
                        <Text>Nombre de usuario: {usuario.displayName || 'Sin nombre definido'}</Text>
                        <Text>Email: {usuario.email}</Text>
                        <Text>Total de posteos: {posteos.length}</Text>

                        {loading ? (
                            <Text>Cargando posteos...</Text>
                        ) : (
                            <FlatList
                                data={posteos}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.post}>
                                        <Text>{item.texto}</Text>
                                        <TouchableOpacity
                                            style={styles.botonBorrar}
                                            onPress={() => this.borrarPosteo(item.id)}
                                        >
                                            <Text style={styles.botonTexto}>Borrar</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        )}

                        <TouchableOpacity style={styles.botonLogout} onPress={this.logout}>
                            <Text style={styles.botonTexto}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text>Cargando usuario...</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    post: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
    },
    botonBorrar: {
        marginTop: 10,
        backgroundColor: '#ff6f61',
        padding: 8,
        borderRadius: 4,
    },
    botonTexto: {
        color: '#fff',
        textAlign: 'center',
    },
    botonLogout: {
        marginTop: 20,
        backgroundColor: '#ff6f61',
        padding: 10,
        borderRadius: 5,
    },
});
