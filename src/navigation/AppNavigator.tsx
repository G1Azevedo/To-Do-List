import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View } from 'react-native'; // Adicionado View
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../screens/auth/LoginScreen';
import CadastroScreen from '../screens/auth/CadastroScreen';
import TarefasScreen from '../screens/app/TarefasScreen';
import PerfilScreen from '../screens/app/PerfilScreen';
import FeriadosScreen from '../screens/app/FeriadoScreen'; // Importe a nova tela

export type RootStackParamList = {
    Login: { successMessage?: string } | undefined;
    Cadastro: undefined;
    Tarefas: undefined;
    Perfil: undefined;
    Feriados: undefined; // Adicione a nova rota
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
                options={({ navigation }) => ({
                    title: 'Minhas Tarefas',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Feriados')}
                                style={{ marginRight: 15 }}
                            >
                                <Ionicons name="calendar-outline" size={30} color="#0D47A1" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Perfil')}
                                style={{ marginRight: 10 }}
                            >
                                <Ionicons name="person-circle-outline" size={32} color="#0D47A1" />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerBackVisible: false,
                })}
            />
            <Stack.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{ title: 'Perfil e Configurações' }}
            />
            <Stack.Screen
                name="Feriados" // Adicione a configuração da tela
                component={FeriadosScreen}
                options={{ title: 'Feriados Nacionais' }}
            />
        </Stack.Navigator>
    );
}