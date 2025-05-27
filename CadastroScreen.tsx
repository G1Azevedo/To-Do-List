import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'; // Adicionado useState
import { StyleSheet, Text, View } from 'react-native'; // TextInput e Button serão adicionados depois

export default function CadastroScreen() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    // const [confirmarSenha, setConfirmarSenha] = useState(""); // Estado declarado mas não usado no JSX fornecido

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cadastro</Text>

            <View style={styles.form}>
                {/* Campos do formulário virão aqui */}
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
    form: { // Novo estilo
        backgroundColor: '#E6F3FF', // Azul bem clarinho
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
});