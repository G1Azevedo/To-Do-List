import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CadastroScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cadastro</Text>
            {/* Mais componentes virão aqui */}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Fundo branco
        padding: 20,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'blue', // Cor azul
        marginBottom: 20,
        textAlign: 'center',
    },
});