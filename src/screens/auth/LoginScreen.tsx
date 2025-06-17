import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import pb from '../../services/pocketbase';
import { saveAuthToken, getAuthToken } from '../../services/authStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation, route }: Props) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const authJson = await getAuthToken();
                if (authJson) {
                    const authData = JSON.parse(authJson);
                    pb.authStore.save(authData.token, authData.model);

                    if (pb.authStore.isValid) {
                        navigation.replace('Tarefas');
                        return;
                    }
                }
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
            }
            setCheckingAuth(false);
        };
        checkUserAuth();
    }, []);

    useEffect(() => {
        if (route.params?.successMessage) {
            setMensagemSucesso(route.params.successMessage);
            setMensagemErro("");
        }
    }, [route.params?.successMessage]);

    const irParaCadastro = () => {
        navigation.navigate('Cadastro');
    };

    const handleLogin = async () => {
        if (!email.trim() || !senha.trim()) {
            setMensagemErro("Preencha e-mail e senha.");
            return;
        }

        setLoading(true);
        setMensagemErro("");

        try {
            await pb.collection('users').authWithPassword(email, senha);

            const authJson = JSON.stringify(pb.authStore);
            await saveAuthToken(authJson);

            navigation.replace('Tarefas');
        } catch (error) {
            setMensagemErro("E-mail ou senha inválidos.");
            console.error("Erro de login:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTextChange = (setter: Function, value: string) => {
        setter(value);
        if (mensagemErro) setMensagemErro("");
        if (mensagemSucesso) setMensagemSucesso("");
    };

    if (checkingAuth) {
        return (
            <View style={styles.containerLoading}>
                <ActivityIndicator size="large" color="#0D47A1" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

            <View style={styles.form}>
                {mensagemSucesso ? <Text style={styles.mensagemSucessoText}>{mensagemSucesso}</Text> : null}

                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={(text) => handleTextChange(setEmail, text)}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={(text) => handleTextChange(setSenha, text)}
                    style={styles.input}
                    secureTextEntry={true}
                    editable={!loading}
                />

                {mensagemErro ? <Text style={styles.mensagemErroText}>{mensagemErro}</Text> : null}

                <Button title={loading ? "Entrando..." : "Entrar"} onPress={handleLogin} disabled={loading} />

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
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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