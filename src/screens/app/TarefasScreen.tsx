import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    FlatList,
    TouchableOpacity,
    Modal,
    SafeAreaView
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Tarefa } from '../../model/Tarefa';

type TarefasScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Tarefas'
>;

type Props = {
    navigation: TarefasScreenNavigationProp;
};

export default function TarefasScreen({ navigation }: Props) {
    // --- ESTADOS ---
    // Campos do formulário para adicionar nova tarefa
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prazo, setPrazo] = useState("");

    // Lista de tarefas
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    // Para o Modal de Edição
    const [modalVisivel, setModalVisivel] = useState(false);
    const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);
    const [tituloEditado, setTituloEditado] = useState("");
    const [descricaoEditada, setDescricaoEditada] = useState("");
    const [prazoEditado, setPrazoEditado] = useState("");

    // --- FUNÇÕES CRUD ---

    // CREATE (Adicionar Tarefa)
    const handleAdicionarTarefa = () => {
        if (!titulo.trim() || !descricao.trim() || !prazo.trim()) {
            Alert.alert("Erro", "Por favor, preencha todos os campos da tarefa.");
            return;
        }

        const novaTarefa = new Tarefa(titulo, descricao, prazo);
        setTarefas(tarefasAtuais => [...tarefasAtuais, novaTarefa]);

        console.log("Tarefa Adicionada:", novaTarefa);
        Alert.alert("Sucesso", "Tarefa adicionada!");

        // Limpa os campos do formulário
        setTitulo("");
        setDescricao("");
        setPrazo("");
    };

    // DELETE (Excluir Tarefa)
    const handleExcluirTarefa = (id: string) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta tarefa?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: () => {
                        setTarefas(tarefasAtuais =>
                            tarefasAtuais.filter(tarefa => tarefa.id !== id)
                        );
                        Alert.alert("Sucesso", "Tarefa excluída!");
                    },
                    style: "destructive"
                },
            ]
        );
    };

    const handleAbrirModalEdicao = (tarefa: Tarefa) => {
        setTarefaEditando(tarefa);
        setTituloEditado(tarefa.titulo);
        setDescricaoEditada(tarefa.descricao);
        setPrazoEditado(tarefa.prazo);
        setModalVisivel(true);
    };

    const handleSalvarEdicao = () => {
        if (!tarefaEditando) return;

        if (!tituloEditado.trim() || !descricaoEditada.trim() || !prazoEditado.trim()) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
            return;
        }

        setTarefas(tarefasAtuais =>
            tarefasAtuais.map(tarefa =>
                tarefa.id === tarefaEditando.id
                    ? { ...tarefa, titulo: tituloEditado, descricao: descricaoEditada, prazo: prazoEditado }
                    : tarefa
            )
        );

        Alert.alert("Sucesso", "Tarefa atualizada!");
        setModalVisivel(false);
        setTarefaEditando(null);
    };

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    // --- RENDERIZAÇÃO ---
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Minhas Tarefas</Text>
            <View style={styles.form}>
                <TextInput placeholder="Título da tarefa" value={titulo} onChangeText={setTitulo} style={styles.input} />
                <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />
                <TextInput placeholder="Prazo (ex: 25/05/2025)" value={prazo} onChangeText={setPrazo} style={styles.input} />
                <Button title="Adicionar Tarefa" onPress={handleAdicionarTarefa} />
            </View>

            {}
            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tarefaItem}>
                        <View style={styles.tarefaInfo}>
                            <Text style={styles.tarefaTitulo}>{item.titulo}</Text>
                            <Text>{item.descricao}</Text>
                            <Text style={styles.tarefaPrazo}>Prazo: {item.prazo}</Text>
                        </View>
                        <View style={styles.tarefaBotoes}>
                            <TouchableOpacity onPress={() => handleAbrirModalEdicao(item)} style={styles.botaoEditar}>
                                <Text style={styles.botaoTexto}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleExcluirTarefa(item.id)} style={styles.botaoExcluir}>
                                <Text style={styles.botaoTexto}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.listaVazia}>Nenhuma tarefa cadastrada.</Text>}
            />

            {}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitulo}>Editar Tarefa</Text>
                        <TextInput value={tituloEditado} onChangeText={setTituloEditado} style={styles.input} />
                        <TextInput value={descricaoEditada} onChangeText={setDescricaoEditada} style={styles.input} />
                        <TextInput value={prazoEditado} onChangeText={setPrazoEditado} style={styles.input} />
                        <View style={styles.modalBotoes}>
                            <Button title="Salvar" onPress={handleSalvarEdicao} />
                            <Button title="Cancelar" onPress={() => setModalVisivel(false)} color="grey" />
                        </View>
                    </View>
                </View>
            </Modal>


            <View style={styles.logoutButtonContainer}>
                <Button title="Sair" onPress={handleLogout} color="red" />
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
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
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    tarefaItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee'
    },
    tarefaInfo: {
        flex: 1,
    },
    tarefaTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    tarefaPrazo: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    tarefaBotoes: {
        flexDirection: 'row',
    },
    botaoEditar: {
        backgroundColor: 'orange',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    botaoExcluir: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    botaoTexto: {
        color: 'white',
    },
    listaVazia: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
    logoutButtonContainer: {
        marginTop: 20,
        marginHorizontal: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    modalTitulo: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    }
});