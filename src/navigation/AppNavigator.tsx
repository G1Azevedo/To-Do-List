import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import CadastroScreen from '../screens/auth/CadastroScreen';
import TarefasScreen from '../screens/app/TarefasScreen';

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
                component={TarefasScreen}
                options={{ title: 'Minhas Tarefas' }}
            />
        </Stack.Navigator>
    );
}