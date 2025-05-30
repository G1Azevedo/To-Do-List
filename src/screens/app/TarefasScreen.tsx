import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type TarefasScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Tarefas'
>;

type Props = {
    navigation: TarefasScreenNavigationProp;
};

export default function TarefasScreen({ navigation }: Props) {

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prazo, setPrazo] = useState("");

    const handleSalvarTarefa = () => {
        if (!titulo.trim() || !descricao.trim() || !prazo.trim()) {
            Alert.alert("Erro", "Por favor, preencha todos os campos da tarefa.");
            return;
        }

        console.log("Tarefa salva:", { titulo, descricao, prazo });
        Alert.alert("Sucesso", "Tarefa salva!");
        setTitulo("");
        setDescricao("");
        setPrazo("");
    };

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Tarefas</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                    placeholder="Digite o título da tarefa"
                    value={titulo}
                    onChangeText={setTitulo}
                    style={styles.input}
                />

                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    placeholder="Digite a descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                    style={styles.input}
                />

                <Text style={styles.label}>Prazo</Text>
                <TextInput
                    placeholder="Digite o prazo (ex: 25/05/2025)"
                    value={prazo}
                    onChangeText={setPrazo}
                    style={styles.input}
                />

                <Button title="Salvar Tarefa" onPress={handleSalvarTarefa} />
            </View>

            <View style={styles.logoutButtonContainer}>
                <Button title="Sair" onPress={handleLogout} color="red" />
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
        marginBottom: 20,
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
    logoutButtonContainer: {
        marginTop: 20,
        marginHorizontal: 50,
    }
});