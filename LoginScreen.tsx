import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

            {/* Formulário será adicionado depois */}
            {/* <View style={styles.form}> ... </View> */}

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

});