import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, FlatList, TouchableOpacity, Modal } from 'react-native';
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
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prazo, setPrazo] = useState("");
    const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null);

    const handleAbrirModalParaNovaTarefa = () => {
        setTarefaSelecionada(null);
        setTitulo("");
        setDescricao("");
        setPrazo("");
        setModalVisivel(true);
    };

    const handleAbrirModalParaEditar = (tarefa: Tarefa) => {
        setTarefaSelecionada(tarefa);
        setTitulo(tarefa.titulo);
        setDescricao(tarefa.descricao);
        setPrazo(tarefa.prazo);
        setModalVisivel(true);
    };

    const handleSalvarTarefa = () => {
        if (!titulo.trim() || !descricao.trim() || !prazo.trim()) {
            Alert.alert("Erro", "Por favor, preencha todos os campos da tarefa.");
            return;
        }

        if (tarefaSelecionada) {
            setTarefas(tarefasAtuais =>
                tarefasAtuais.map(t =>
                    t.id === tarefaSelecionada.id ? { ...t, titulo, descricao, prazo } : t
                )
            );
            Alert.alert("Sucesso", "Tarefa atualizada!");
        } else {
            const novaTarefa = new Tarefa(titulo, descricao, prazo);
            setTarefas(tarefasAtuais => [...tarefasAtuais, novaTarefa]);
            Alert.alert("Sucesso", "Tarefa adicionada!");
        }
        setModalVisivel(false);
    };
    
    const handleExcluirTarefa = useCallback((idParaExcluir: string) => {
        setTarefas(tarefasAtuais =>
            tarefasAtuais.filter(t => t.id !== idParaExcluir)
        );
    }, []);

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const renderItem = ({ item }: { item: Tarefa }) => (
        <View style={styles.tarefaContainer}>
            <View style={styles.tarefaInfo}>
                <Text style={styles.tarefaTitulo}>{item.titulo}</Text>
                <Text>{item.descricao}</Text>
                <Text style={styles.tarefaPrazo}>Prazo: {item.prazo}</Text>
            </View>
            <View style={styles.tarefaBotoes}>
                <TouchableOpacity style={[styles.botao, styles.botaoEditar]} onPress={() => handleAbrirModalParaEditar(item)}>
                    <Text style={styles.botaoTexto}>Editar</Text>
                </TouchableOpacity>
                {}
                <TouchableOpacity style={[styles.botao, styles.botaoExcluir]} onPress={() => handleExcluirTarefa(item.id)}>
                    <Text style={styles.botaoTexto}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Minhas Tarefas</Text>

            <FlatList
                data={tarefas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={styles.listaVaziaTexto}>Nenhuma tarefa adicionada ainda.</Text>}
                extraData={tarefas}
            />

            <TouchableOpacity
                style={styles.botaoFlutuante}
                onPress={handleAbrirModalParaNovaTarefa}
            >
                <Text style={styles.botaoFlutuanteTexto}>+</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitulo}>{tarefaSelecionada ? 'Editar Tarefa' : 'Adicionar Tarefa'}</Text>
                        <TextInput
                            placeholder="Título da tarefa"
                            value={titulo}
                            onChangeText={setTitulo}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Descrição"
                            value={descricao}
                            onChangeText={setDescricao}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Prazo (ex: 25/06/2025)"
                            value={prazo}
                            onChangeText={setPrazo}
                            style={styles.input}
                        />
                        <View style={styles.modalBotoes}>
                            <Button title="Cancelar" onPress={() => setModalVisivel(false)} color="gray" />
                            <Button title={tarefaSelecionada ? 'SALVAR' : 'ADICIONAR'} onPress={handleSalvarTarefa} />
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.logoutButtonContainer}>
                <Button title="SAIR" onPress={handleLogout} color="red" />
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
        color: '#0000CD',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    logoutButtonContainer: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    tarefaContainer: {
        backgroundColor: '#f1f1f1',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    tarefaInfo: {
        flex: 1,
    },
    tarefaTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    tarefaPrazo: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    tarefaBotoes: {
        flexDirection: 'row',
        gap: 8
    },
    botao: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    botaoEditar: {
        backgroundColor: '#ffc107',
    },
    botaoExcluir: {
        backgroundColor: '#dc3545',
    },
    botaoTexto: {
        color: 'white',
        fontWeight: 'bold',
    },
    listaVaziaTexto: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: 'gray',
    },
    botaoFlutuante: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        right: 30,
        bottom: 100,
        elevation: 8,
    },
    botaoFlutuanteTexto: {
        fontSize: 30,
        color: 'white',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 10,
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    }
});