import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import pb from '../../services/pocketbase';

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
    const [mensagemErro, setMensagemErro] = useState("");
    const [loading, setLoading] = useState(false);

    const irParaLogin = () => {
        navigation.navigate('Login');
    };

    const validarEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleCadastro = async () => {
        setMensagemErro("");

        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            setMensagemErro("Por favor, preencha todos os campos.");
            return;
        }
        if (!validarEmail(email)) {
            setMensagemErro("Por favor, digite um e-mail válido.");
            return;
        }
        if (senha.length < 6) {
            setMensagemErro("A senha deve ter no mínimo 6 caracteres.");
            return;
        }
        if (senha !== confirmarSenha) {
            setMensagemErro("As senhas não coincidem.");
            return;
        }

        setLoading(true);

        const data = {
            email: email,
            emailVisibility: true,
            password: senha,
            passwordConfirm: confirmarSenha,
            name: nome,
        };

        try {
            await pb.collection('users').create(data);
            navigation.navigate('Login', { successMessage: 'Usuário cadastrado com sucesso!' });
        } catch (error: any) {
            setMensagemErro('Erro ao cadastrar. Verifique os dados e tente novamente.');
            console.error('Erro de cadastro:', JSON.stringify(error));
        } finally {
            setLoading(false);
        }
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
                    editable={!loading}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha (mín. 6 caracteres)"
                    value={senha}
                    onChangeText={setSenha}
                    style={styles.input}
                    secureTextEntry={true}
                    editable={!loading}
                />

                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    style={styles.input}
                    secureTextEntry={true}
                    editable={!loading}
                />

                {mensagemErro ? <Text style={styles.mensagemErroText}>{mensagemErro}</Text> : null}

                <Button title={loading ? "Cadastrando..." : "Cadastrar"} onPress={handleCadastro} disabled={loading} />

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
});