import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Tarefa } from '../../model/Tarefa';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import MaskInput from 'react-native-mask-input';

type TarefasScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Tarefas'
>;

type Props = {
    navigation: TarefasScreenNavigationProp;
};

export default function TarefasScreen({ navigation }: Props) {
    const [lista, setLista] = useState<Tarefa[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [editando, setEditando] = useState<Tarefa | null>(null);

    const [data, setData] = useState(new Date());
    const [prazo, setPrazo] = useState('');

    const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setMostrarDatePicker(false);
        if (selectedDate) {
            setData(selectedDate);
        }
    };

    const parsePrazo = (prazoString: string): Date => {
        const parts = prazoString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
        return new Date();
    };

    const isPrazoValido = (prazoStr: string): boolean => {
        const parts = prazoStr.split('/');
        if (parts.length !== 3) return false;

        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1000) {
            return false;
        }

        const dateObj = new Date(year, month - 1, day);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() !== month - 1 || dateObj.getDate() !== day) {
            return false;
        }

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        if (dateObj < hoje) {
            return false;
        }

        return true;
    };

    const abrirModal = (tarefa?: Tarefa) => {
        if (tarefa) {
            setEditando(tarefa);
            setTitulo(tarefa.titulo);
            setDescricao(tarefa.descricao);
            setData(parsePrazo(tarefa.prazo));
            setPrazo(tarefa.prazo);
        } else {
            setEditando(null);
            setTitulo('');
            setDescricao('');
            const hoje = new Date();
            setData(hoje);
            setPrazo(hoje.toLocaleDateString('pt-BR'));
        }
        setMostrarModal(true);
    };

    const salvar = () => {
        if (!titulo.trim() || !descricao.trim()) {
            Alert.alert('Opa!', 'Preencha tudo direitinho antes de salvar.');
            return;
        }

        if (Platform.OS === 'web') {
            if (!isPrazoValido(prazo)) {
                Alert.alert('Data Inválida', 'Por favor, insira uma data válida e que não seja no passado.');
                return;
            }
        }

        const prazoFinal = Platform.OS === 'web' ? prazo : data.toLocaleDateString('pt-BR');

        if (editando) {
            setLista(listaAntiga =>
                listaAntiga.map(t =>
                    t.id === editando.id ? { ...t, titulo, descricao, prazo: prazoFinal } : t
                )
            );
            Alert.alert('Pronto!', 'Tarefa atualizada com sucesso!');
        } else {
            const nova = new Tarefa(titulo, descricao, prazoFinal);
            setLista(tarefas => [...tarefas, nova]);
            Alert.alert('Feito!', 'Tarefa adicionada na sua lista.');
        }

        setMostrarModal(false);
    };

    const concluirTarefa = (id: string) => {
        setLista(listaAtual =>
            listaAtual.map(tarefa =>
                tarefa.id === id ? { ...tarefa, concluida: true } : tarefa
            )
        );
        setTimeout(() => {
            setLista(listaAtual => listaAtual.filter(tarefa => tarefa.id !== id));
        }, 500);
    };

    const excluir = (id: string) => {
        setLista(tarefas => tarefas.filter(t => t.id !== id));
    };

    const sair = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const renderTarefa = ({ item }: { item: Tarefa }) => (
        <View style={[styles.card, item.concluida && styles.tarefaConcluida]}>
            <View style={{ flex: 1 }}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text>{item.descricao}</Text>
                <Text style={styles.prazo}>Prazo: {item.prazo}</Text>
            </View>
            <View style={styles.botoes}>
                {!item.concluida && (
                    <TouchableOpacity
                        style={[styles.botao, styles.concluir]}
                        onPress={() => concluirTarefa(item.id)}
                    >
                        <Text style={styles.botaoTexto}>Concluir</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.botao, styles.editar]}
                    onPress={() => abrirModal(item)}
                >
                    <Text style={styles.botaoTexto}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.botao, styles.excluir]}
                    onPress={() => excluir(item.id)}
                >
                    <Text style={styles.botaoTexto}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Minhas Tarefas</Text>

            <FlatList
                data={lista}
                renderItem={renderTarefa}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <Text style={styles.vazio}>Você ainda não adicionou nenhuma tarefa 🙃</Text>
                }
            />

            <TouchableOpacity style={styles.fab} onPress={() => abrirModal()}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent
                visible={mostrarModal}
                onRequestClose={() => setMostrarModal(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitulo}>
                            {editando ? 'Editar Tarefa' : 'Nova Tarefa'}
                        </Text>

                        <TextInput
                            placeholder="Título"
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

                        {Platform.OS === 'web' ? (
                            <MaskInput
                                value={prazo}
                                onChangeText={(masked) => setPrazo(masked)}
                                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="DD/MM/AAAA"
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        ) : (
                            <TouchableOpacity onPress={() => setMostrarDatePicker(true)} style={styles.datePickerButton}>
                                <Text style={styles.datePickerButtonText}>
                                    Prazo: {data.toLocaleDateString('pt-BR')}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.modalBotoes}>
                            <Button title="Cancelar" onPress={() => setMostrarModal(false)} color="gray" />
                            <Button title="Salvar" onPress={salvar} />
                        </View>
                    </View>
                </View>
            </Modal>

            {mostrarDatePicker && Platform.OS !== 'web' && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={data}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            <View style={styles.logout}>
                <Button title="Sair da Conta" onPress={sair} color="red" />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0D47A1',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#f2f2f2',
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
    },
    datePickerButtonText: {
        fontSize: 16,
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    tarefaConcluida: {
        opacity: 0.5,
        textDecorationLine: 'line-through',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    prazo: {
        fontSize: 12,
        color: '#555',
        marginTop: 5,
    },
    botoes: {
        flexDirection: 'row',
        gap: 10,
    },
    botao: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    concluir: {
        backgroundColor: '#4CAF50',
    },
    editar: {
        backgroundColor: '#FFD54F',
    },
    excluir: {
        backgroundColor: '#E57373',
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
    vazio: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#777',
    },
    fab: {
        position: 'absolute',
        bottom: 90,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1976D2',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
    },
    fabText: {
        color: '#fff',
        fontSize: 30,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 10,
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    logout: {
        marginTop: 20,
    },
});