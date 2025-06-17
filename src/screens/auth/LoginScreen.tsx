import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { usuariosCadastrados } from '../auth/CadastroScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation, route }: Props) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@usuarios');
                if (jsonValue != null) {
                    const usuariosSalvos = JSON.parse(jsonValue);
                    if (usuariosSalvos.length > 0) {
                        usuariosCadastrados.length = 0;
                        Array.prototype.push.apply(usuariosCadastrados, usuariosSalvos);
                    }
                }
            } catch (e) {
                console.error("Erro ao carregar usuários", e);
            }
        };

        carregarUsuarios();
    }, []);

    useEffect(() => {
        if (route.params?.successMessage) {
            setMensagemSucesso(route.params.successMessage);
            setMensagemErro("");
        }
    }, [route.params?.successMessage]);

    const irParaCadastro = () => {
        setMensagemErro("");
        navigation.navigate('Cadastro');
    };

    const handleLogin = () => {
        const usuarioEncontrado = usuariosCadastrados.find(
            user => user.email === email && user.senha === senha
        );

        if (usuarioEncontrado) {
            setMensagemErro("");
            navigation.replace('Tarefas');
        } else {
            setMensagemErro("Usuário ou senha incorreta.");
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (mensagemErro) setMensagemErro("");
        if (mensagemSucesso) setMensagemSucesso("");
    };

    const handleSenhaChange = (text: string) => {
        setSenha(text);
        if (mensagemErro) setMensagemErro("");
        if (mensagemSucesso) setMensagemSucesso("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

            <View style={styles.form}>
                {mensagemSucesso ? <Text style={styles.mensagemSucessoText}>{mensagemSucesso}</Text> : null}

                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={handleEmailChange}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={handleSenhaChange}
                    style={styles.input}
                    secureTextEntry={true}
                />

                {mensagemErro ? <Text style={styles.mensagemErroText}>{mensagemErro}</Text> : null}

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
        marginBottom: 15,
        fontSize: 16,
        fontWeight: 'bold',
    }
});