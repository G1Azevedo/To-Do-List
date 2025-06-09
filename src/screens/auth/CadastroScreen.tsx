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

export const usuariosCadastrados: { email: string; senha: string }[] = [];

export default function CadastroScreen({ navigation }: Props) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    const irParaLogin = () => {
        setMensagemSucesso("");
        setMensagemErro("");
        navigation.navigate('Login');
    };

    const handleCadastro = () => {
        setMensagemSucesso("");
        setMensagemErro("");

        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            setMensagemErro("Por favor, preencha todos os campos.");
            return;
        }
        if (senha !== confirmarSenha) {
            setMensagemErro("As senhas não coincidem.");
            return;
        }

        if (usuariosCadastrados.some(user => user.email === email)) {
            setMensagemErro("Este email já está cadastrado. Tente outro.");
            return;
        }

        usuariosCadastrados.push({ email, senha });
        console.log("Usuários cadastrados atualmente (simulação):", usuariosCadastrados);

        setMensagemSucesso("Usuário cadastrado com sucesso! Agora você pode fazer login.");

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

                {mensagemErro ? <Text style={styles.mensagemErroText}>{mensagemErro}</Text> : null}

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
    mensagemErroText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
    },

    mensagemSucessoText: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    }
});