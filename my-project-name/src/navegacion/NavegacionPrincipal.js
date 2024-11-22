import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import NavegacionAnidada from './NavegacionAnidada'

const Stack = createNativeStackNavigator()

export default class NavegacionPrincipal extends Component {
  render() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Register' component={Register}  options={{headerShown: false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
            <Stack.Screen name='Home' component={NavegacionAnidada}  options={{headerShown: false}} />
        </Stack.Navigator>
    )
  }
}