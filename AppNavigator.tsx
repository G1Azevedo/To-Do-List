// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../LoginScreen'; // Ajuste o caminho se necessário
import CadastroScreen from '../CadastroScreen'; // Ajuste o caminho se necessário
import TarefasScreen from '../TarefasScreen'; // Você precisará criar este arquivo com o conteúdo da sua tela de tarefas

// Defina os tipos para suas rotas
export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Tarefas: undefined; // Ou { userId: string } etc., se precisar passar parâmetros
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
            <Stack.Screen
                name="Tarefas"
                component={TarefasScreen} // Este será o componente que antes era seu App.tsx
                options={{ title: 'Minhas Tarefas' }}
            />
        </Stack.Navigator>
    );
}