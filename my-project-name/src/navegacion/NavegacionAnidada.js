import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import Home from '../screens/Home'
import Profile from '../screens/Profile';
import BuscadorUsers from '../screens/UsersSearch';
import CreatePost from '../screens/CreatePost';

const Tab = createBottomTabNavigator()

export default class NavegacionAnidada extends Component {
  render() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name='home' component={Home} 
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
                }}/>

            <Tab.Screen name='profile' component={Profile}  options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome5 name="user" size={24} color="black" />}}
            
            />
            <Tab.Screen name='create post' component={CreatePost}  options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome6 name="add" size={24} color="black" />}}
            
            />
            <Tab.Screen name='search profiles' component={BuscadorUsers}  options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }}/>
            
        </Tab.Navigator>
    )
  }
}