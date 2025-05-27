// LoginScreen.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator'; // Importa os tipos do AppNavigator

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const irParaCadastro = () => {
        navigation.navigate('Cadastro'); // Navega para a tela de Cadastro
    };

    const handleLogin = () => {
        // Lógica de login simulada:
        if (email.trim() !== "" && senha.trim() !== "") {
            console.log("Tentativa de login com:", email);
            // Substitui a pilha de navegação para que o usuário não volte para Login
            navigation.replace('Tarefas');
        } else {
            alert("Por favor, preencha email e senha.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                    style={styles.input}
                    secureTextEntry={true}
                />

                <Button title="Entrar" onPress={handleLogin} />

                <TouchableOpacity onPress={irParaCadastro} style={styles.linkContainer}>
                    <Text style={styles.linkText}>Ainda não tem uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'blue', //
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#E6F3FF', //
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    linkContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: 'blue', //
        textDecorationLine: 'underline',
    },
});