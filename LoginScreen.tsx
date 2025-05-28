// LoginScreen.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'; // Alert removido se não for mais usado para outros fins
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';

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
    const [mensagemErro, setMensagemErro] = useState(""); // Novo estado para a mensagem de erro

    const irParaCadastro = () => {
        setMensagemErro(""); // Limpa a mensagem de erro ao navegar
        navigation.navigate('Cadastro');
    };

    const handleLogin = () => {
        console.log("Tentativa de login com email:", email, "e senha:", senha);
        if (email.trim() === "gabriel@gmail.com" && senha === "gabriel123") {
            console.log("Login bem-sucedido para:", email);
            setMensagemErro(""); // Limpa a mensagem de erro em caso de sucesso
            navigation.replace('Tarefas');
        } else {
            console.log("Credenciais incorretas, definindo mensagem de erro na tela.");
            setMensagemErro("Usuário ou senha incorreta."); // Define a mensagem de erro
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
                    onChangeText={(text) => {
                        setEmail(text);
                        if (mensagemErro) setMensagemErro(""); // Limpa o erro ao digitar
                    }}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={(text) => {
                        setSenha(text);
                        if (mensagemErro) setMensagemErro(""); // Limpa o erro ao digitar
                    }}
                    style={styles.input}
                    secureTextEntry={true}
                />

                {/* Exibe a mensagem de erro aqui, se houver */}
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
    // Novo estilo para a mensagem de erro
    mensagemErroText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
    }
});