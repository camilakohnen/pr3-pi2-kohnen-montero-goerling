import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavegacionPrincipal from './src/navegacion/NavegacionPrincipal';

export default function App() {
  return (
    <NavigationContainer>
      <NavegacionPrincipal/>   
    </NavigationContainer>
  );
}