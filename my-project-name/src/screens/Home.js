import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentarios: [], 
        };
    }

    componentDidMount() {
        
        db.collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot((docs) => {
            let arrDocs = [];
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id, 
                    data: doc.data(), 
                });
            });

     
            this.setState({
                comentarios: arrDocs,
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Posts</Text>
                <FlatList
                    data={this.state.comentarios}
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={({ item }) => (
                        <View style={styles.commentCard}>
                            <Text style={styles.commentText}>
                                <Text style={styles.userEmail}>{item.data.userEmail}: </Text>
                                {item.data.texto}
                            </Text>
                            <Text style={styles.date}>
                                {item.data.createdAt?.toDate?.().toLocaleString() || 'Sin fecha'}
                            </Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    commentCard: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    commentText: {
        fontSize: 16,
        color: '#333',
    },
    username: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    date: {
        marginTop: 5,
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
});

export default Home;
