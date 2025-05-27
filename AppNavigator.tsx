// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../LoginScreen'; // Ajuste o caminho se necessário
import CadastroScreen from '../CadastroScreen'; // Ajuste o caminho se necessário

// Defina os tipos para suas rotas
export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Cadastro"
                component={CadastroScreen}
                options={{ title: 'Crie sua Conta' }}
            />
        </Stack.Navigator>
    );
}