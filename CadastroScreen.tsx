// CadastroScreen.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'; // Adicionado Alert
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator'; // Importa os tipos do AppNavigator

type CadastroScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Cadastro'
>;

type Props = {
    navigation: CadastroScreenNavigationProp;
};

export default function CadastroScreen({ navigation }: Props) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const irParaLogin = () => {
        navigation.navigate('Login'); // Navega para a tela de Login
    };

    const handleCadastro = () => {
        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }
        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }
        // Lógica de cadastro simulada:
        console.log("Tentativa de cadastro para:", nome, email);
        Alert.alert("Sucesso", "Cadastro realizado! Faça login para continuar.");
        navigation.navigate('Login'); // Navega para Login após cadastro
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cadastro</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                    placeholder="Digite seu nome completo"
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                    autoCapitalize="words"
                />

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
                    placeholder="Digite sua senha (mín. 6 caracteres)" // Adicionada dica
                    value={senha}
                    onChangeText={setSenha}
                    style={styles.input}
                    secureTextEntry={true}
                />

                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    style={styles.input}
                    secureTextEntry={true}
                />

                <Button title="Cadastrar" onPress={handleCadastro} />

                <TouchableOpacity onPress={irParaLogin} style={styles.linkContainer}>
                    <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', //
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