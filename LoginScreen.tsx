import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'; // Adicionado Button e TouchableOpacity

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

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

                <Button title="Entrar" onPress={() => { /* Lógica de login aqui */ }} />

                <TouchableOpacity onPress={() => { /* Navegar para tela de cadastro */ }} style={styles.linkContainer}>
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
        color: 'blue',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#E6F3FF',
        padding: 10, // Mantendo padding menor por enquanto
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
        marginBottom: 15, // Aumentando um pouco a margem inferior do input
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    linkContainer: {
        marginTop: 15, // Espaçamento acima do link
        alignItems: 'center',
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});