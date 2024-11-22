import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [], 
      posts: [], 
      loading: true, // Indicador de carga
    };
  }

  componentDidMount() {
    const usuarioActual = auth.currentUser;

    // verifica si el usuario está logueado
    if (usuarioActual) {
      this.setState({ loading: true });

      db.collection('users')
        .where('owner', '==', usuarioActual.email) // filtrar por email del usuario
        .onSnapshot((docs) => {
          let arrDocs = [];
          docs.forEach((doc) => {
            arrDocs.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.setState({ userInfo: arrDocs });
        });

      // Cargar los posteos del usuario
      db.collection('posts')
        .where('userEmail', '==', usuarioActual.email) // Filtrar los posteos por el email del usuario
        .onSnapshot((snapshot) => {
          const posteos = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
          console.log(posteos)
          this.setState({ posts: posteos, loading: false });
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
deletePost = (postId) => {
  db.collection('posts')
    .doc(postId)
    .delete()
    .then(() => {
      console.log('Post eliminado');
    })
    .catch((error) => {
      console.error('Error al eliminar el post: ', error);
    });
};

  render() {
    const { userInfo, posts, loading } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        {userInfo.length > 0 ? (
          <View style={styles.userInfo}>
            <Text style={styles.info}>Usuario: {userInfo[0].data.username}</Text>
            <Text style={styles.info}>Email: {auth.currentUser.email}</Text>
            <Text style={styles.info}>Total de posteos: {posts.length}</Text>
          </View>
        ) : (
          <Text style={styles.info}>Cargando información del usuario...</Text>
        )}

        <Text style={styles.subtitle}>Mis posteos:</Text>
        {loading ? (
          <Text style={styles.info}>Cargando posteos...</Text>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Text style={styles.postText}>{item.userEmail}</Text>
                <Text style={styles.postText}>{item.texto}</Text>

                {/* Botón para eliminar el post */}
                <TouchableOpacity 
                  style={styles.deleteButton} 
                  onPress={() => this.deletePost(item.id)}>
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Botón de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffe4e1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d63384',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#d63384',
  },
  postContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6f61',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});