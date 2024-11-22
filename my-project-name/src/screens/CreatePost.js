import { Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
        texto: '', 
        error: '',
        verificacion: "", //pare verificar si el posteo esta subido y luego mandar a home
    };
}

enviarPosteo() {
    const { texto } = this.state;

    if (texto.length !== 0) {
        // Aca debe ir que verifique que el usuario esté logueado HACER
        const user = auth.currentUser;

            const nuevoPost = {
                texto: texto,
                createdAt: new Date(), // Fecha de creación
                userEmail: user.email, // Email del usuario creador
                likes: [], 
            };

            // Guardar en Firestore
            db.collection('posts')
                .add(nuevoPost)
                .then(() => {
                    this.setState( {verificacion: 'El posteo fue creado exitosamente.'})
                    this.setState({ texto: '' }); 
                    
                })
                
    } else {
                this.setState( {error: "Ingrese un texto"})
                return ;
        }
}

irAHome(){
    this.props.navigation.navigate('home')
}

render() {
    return (
        <View style={styles.container}>
            <Text>Crear Nuevo Posteo</Text>
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Escribe tu posteo aquí..."
                    onChangeText={(texto) => this.setState({ texto })}
                    value={this.state.texto}
                />

                {
                    this.state.error !== '' &&
                    <Text style={styles.errorText}>
                        {this.state.error}
                    </Text>
                }
                {
                    this.state.verificacion !== "" && 
                    this.irAHome()
                }
                 
                <TouchableOpacity
                    onPress={() => this.enviarPosteo() }
        
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Crear Posteo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
}

const styles = StyleSheet.create({
container: {
    padding: 20,
},
input: {
    borderWidth: 2,
    borderColor: '#ff69b4',
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
},
button: {
    backgroundColor: '#fca3b7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ff69b4',
    alignItems: 'center',
},
buttonText: {
    color: '#fff',
    textAlign: 'center',
},
errorText: {
    color: 'red',
    marginVertical: 5,
    textAlign: 'center',
},
});

