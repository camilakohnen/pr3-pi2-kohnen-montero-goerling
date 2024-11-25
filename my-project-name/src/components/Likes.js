import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';

export default class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLiked: false,
            contador: this.props.likes ? this.props.likes : 0, 
        };
    }

    componentDidMount() {
        const user = auth.currentUser.email;

        db.collection('posts')
            .doc(this.props.postId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    console.log('Datos del documento:', data);

                    this.setState({
                        contador: data.contador ? data.contador : 0, 
                        userLiked: data.likes?.includes(user) ? true : false, 
                    });
                }
            });
    }

    likear = () => {
        const user = auth.currentUser.email;
        const postId = this.props.postId;

        if (this.state.userLiked) {
            // Eliminar el like
            db.collection('posts')
                .doc(postId)
                .update({
                    likes: firebase.firestore.FieldValue.arrayRemove(user),
                    contador: firebase.firestore.FieldValue.increment(-1),
                });
        } else {
            // Agregar el like
            db.collection('posts')
                .doc(postId)
                .update({
                    likes: firebase.firestore.FieldValue.arrayUnion(user),
                    contador: firebase.firestore.FieldValue.increment(1),
                });
        }
    };

    render() {
        return (
            <View style={styles.likeContainer}>
                <TouchableOpacity onPress={() => this.likear()}>
                    <Text style={[styles.likeText, this.state.userLiked && styles.liked]}>
                        {this.state.userLiked ? 'Quitar Like' : 'Like'}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.contador}>{this.state.contador}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    likeText: {
        color: '#e57d90',
        fontSize: 14,
        marginRight: 10,
    },
    liked: {
        color: '#ff4500', // Color diferente si ya dio like
    },
    contador: {
        color: '#333',
        fontSize: 14,
    },
});
