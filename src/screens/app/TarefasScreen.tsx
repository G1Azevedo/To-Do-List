// TarefasScreen.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'; // Adicionado Alert para consistência, embora não usado neste exemplo
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Importação para tipagem da navegação
import { RootStackParamList } from '../../navigation/AppNavigator'; // Importa os tipos do AppNavigator

// Define o tipo para a propriedade de navegação da TarefasScreen
type TarefasScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Tarefas'
>;

// Define o tipo para as props do componente TarefasScreen
type Props = {
    navigation: TarefasScreenNavigationProp;
};

export default function TarefasScreen({ navigation }: Props) { // Adicionada a prop navigation

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prazo, setPrazo] = useState("");

    const handleSalvarTarefa = () => {
        if (!titulo.trim() || !descricao.trim() || !prazo.trim()) {
            Alert.alert("Erro", "Por favor, preencha todos os campos da tarefa.");
            return;
        }
        // Lógica para salvar a tarefa (simulada)
        console.log("Tarefa salva:", { titulo, descricao, prazo });
        Alert.alert("Sucesso", "Tarefa salva!");
        // Limpar campos após salvar
        setTitulo("");
        setDescricao("");
        setPrazo("");
    };

    const handleLogout = () => {
        // Reseta a pilha de navegação para a tela de Login
        // Isso impede o usuário de voltar para a tela de Tarefas
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
        fontSize: 28, // Aumentado para consistência com outras telas
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 20, // Aumentado para consistência
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#E6F3FF', // Cor similar ao formulário de Login/Cadastro
        padding: 20,
        borderRadius: 10,
        marginBottom: 20, // Adicionado espaço antes do botão de logout
    },
    label: { // Estilo de label adicionado para consistência
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1, // Alterado para borda completa para consistência
        borderColor: '#ccc',
        borderRadius: 5, // Adicionado para consistência
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    logoutButtonContainer: {
        marginTop: 20,
        marginHorizontal: 50, // Para centralizar um pouco o botão se ele for estreito
    }
});