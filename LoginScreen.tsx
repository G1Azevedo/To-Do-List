import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

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
        backgroundColor: '#fff', // Fundo branco, conforme o briefing original para outras telas
        padding: 20,
        justifyContent: 'center', // Centralizar o formulário na tela
    },
    titulo: {
        fontSize: 28, // Aumentei um pouco para dar mais destaque ao título da tela
        fontWeight: 'bold',
        color: 'blue', // Cor azul, conforme o briefing original
        marginBottom: 20, // Aumentei a margem inferior
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#E6F3FF', // Um azul bem clarinho, puxando para o branco e azul do briefing
        padding: 20, // Aumentei o padding interno do formulário
        borderRadius: 10,
        width: '100%', // Ocupar toda a largura disponível
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333', // Cor um pouco mais escura para o label, para contraste
    },
    input: {
        borderWidth: 1, // Adicionei borda completa para melhor visualização
        borderColor: '#ccc',
        borderRadius: 5, // Bordas levemente arredondadas no input
        marginBottom: 15, // Aumentei a margem inferior
        paddingVertical: 10, // Aumentei o padding vertical
        paddingHorizontal: 10, // Padding horizontal
        fontSize: 16,
    },
    linkContainer: {
        marginTop: 20, // Espaçamento acima do link
        alignItems: 'center', // Centralizar o texto do link
    },
    linkText: {
        color: 'blue', // Cor azul para o link
        textDecorationLine: 'underline', // Sublinhado para indicar que é um link
    },
});