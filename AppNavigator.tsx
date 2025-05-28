// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import CadastroScreen from './CadastroScreen';
// Alterado para importar de './TarefasScreen' e o componente TarefasScreen
import TarefasScreen from './TarefasScreen';

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Tarefas: undefined;
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
                component={TarefasScreen} // Agora usa o componente TarefasScreen importado corretamente
                options={{ title: 'Minhas Tarefas' }}
            />
        </Stack.Navigator>
    );
}