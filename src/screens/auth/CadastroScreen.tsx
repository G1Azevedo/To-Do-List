// CadastroScreen.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

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
    const [mensagemSucesso, setMensagemSucesso] = useState(""); // Novo estado para mensagem de sucesso
    const [mensagemErro, setMensagemErro] = useState(""); // Estado para mensagens de erro de validação

    const irParaLogin = () => {
        setMensagemSucesso(""); // Limpa mensagens ao navegar
        setMensagemErro("");
        navigation.navigate('Login');
    };

    const handleCadastro = () => {
        setMensagemSucesso(""); // Limpa mensagem de sucesso anterior
        setMensagemErro("");   // Limpa mensagem de erro anterior

        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            setMensagemErro("Por favor, preencha todos os campos."); // Exibe erro na tela
            return;
        }
        if (senha !== confirmarSenha) {
            setMensagemErro("As senhas não coincidem."); // Exibe erro na tela
            return;
        }
        // Lógica de cadastro simulada:
        console.log("Tentativa de cadastro para:", nome, email);
        setMensagemSucesso("Usuário cadastrado com sucesso!"); // Define a mensagem de sucesso

        // Limpa os campos do formulário
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cadastro</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                    placeholder="Digite seu nome completo"
                    value={nome}
                    onChangeText={(text) => {
                        setNome(text);
                        if (mensagemErro || mensagemSucesso) {
                            setMensagemErro("");
                            setMensagemSucesso("");
                        }
                    }}
                    style={styles.input}
                    autoCapitalize="words"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        if (mensagemErro || mensagemSucesso) {
                            setMensagemErro("");
                            setMensagemSucesso("");
                        }
                    }}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha (mín. 6 caracteres)"
                    value={senha}
                    onChangeText={(text) => {
                        setSenha(text);
                        if (mensagemErro || mensagemSucesso) {
                            setMensagemErro("");
                            setMensagemSucesso("");
                        }
                    }}
                    style={styles.input}
                    secureTextEntry={true}
                />

                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChangeText={(text) => {
                        setConfirmarSenha(text);
                        if (mensagemErro || mensagemSucesso) {
                            setMensagemErro("");
                            setMensagemSucesso("");
                        }
                    }}
                    style={styles.input}
                    secureTextEntry={true}
                />

                {/* Exibe a mensagem de erro de validação, se houver */}
                {mensagemErro ? <Text style={styles.mensagemErroText}>{mensagemErro}</Text> : null}

                {/* Exibe a mensagem de sucesso, se houver */}
                {mensagemSucesso ? <Text style={styles.mensagemSucessoText}>{mensagemSucesso}</Text> : null}

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
        color: 'blue',
        textDecorationLine: 'underline',
    },
    mensagemErroText: { // Já existia um parecido na tela de Login
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
    },
    // Novo estilo para a mensagem de sucesso
    mensagemSucessoText: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16, // Um pouco maior para dar destaque
        fontWeight: 'bold',
    }
});