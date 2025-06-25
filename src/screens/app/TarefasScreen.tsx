import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Tarefa } from '../../model/Tarefa';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import MaskInput from 'react-native-mask-input';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import pb from '../../services/pocketbase';
import { deleteAuthToken } from '../../services/authStorage';
import TarefaCard from '../../components/TarefaCard';
import AppModal from '../../components/AppModal'; // Importando o novo componente

type TarefasScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tarefas'>;

type Props = {
    navigation: TarefasScreenNavigationProp;
};

const categorias = ['Trabalho', 'Faculdade', 'Academia', 'Compras', 'Outros'];

export default function TarefasScreen({ navigation }: Props) {
    const [lista, setLista] = useState<Tarefa[]>([]);
    const [listaFiltrada, setListaFiltrada] = useState<Tarefa[]>([]);
    const [loading, setLoading] = useState(true);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [editando, setEditando] = useState<Tarefa | null>(null);
    const [data, setData] = useState(new Date());
    const [prazo, setPrazo] = useState('');
    const [categoria, setCategoria] = useState(categorias[0]);
    const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

    const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
    const [filtroData, setFiltroData] = useState<Date | null>(null);
    const [mostrarFiltroData, setMostrarFiltroData] = useState(false);

    const carregarTarefas = async () => {
        setLoading(true);
        try {
            if (!pb.authStore.model) {
                navigation.replace('Login');
                return;
            }
            const records = await pb.collection('tarefas').getFullList<Tarefa>();
            setLista(records);
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error);
            Alert.alert("Erro", "Sua sessão expirou. Por favor, faça login novamente.");
            pb.authStore.clear();
            await deleteAuthToken();
            navigation.replace('Login');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (pb.authStore.isValid) {
                carregarTarefas();
            } else {
                navigation.replace('Login');
            }
        }, [])
    );

    useEffect(() => {
        let tarefasFiltradas = [...lista];

        if (filtroCategoria) {
            tarefasFiltradas = tarefasFiltradas.filter(
                t => t.categoria === filtroCategoria
            );
        }

        if (filtroData) {
            tarefasFiltradas = tarefasFiltradas.filter(t => {
                const dataTarefa = new Date(t.prazo);
                const dataFiltro = new Date(filtroData);
                return dataTarefa.getUTCFullYear() === dataFiltro.getUTCFullYear() &&
                    dataTarefa.getUTCMonth() === dataFiltro.getUTCMonth() &&
                    dataTarefa.getUTCDate() === dataFiltro.getUTCDate();
            });
        }

        tarefasFiltradas.sort((a, b) => Number(a.concluida) - Number(b.concluida));

        setListaFiltrada(tarefasFiltradas);
    }, [lista, filtroCategoria, filtroData]);


    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setMostrarDatePicker(false);
        if (selectedDate) {
            setData(selectedDate);
            setPrazo(selectedDate.toLocaleDateString('pt-BR'));
        }
    };

    const onFiltroDataChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setMostrarFiltroData(false);
        if (event.type === 'set' && selectedDate) {
            setFiltroData(selectedDate);
        }
    }

    const isPrazoValido = (prazoStr: string): boolean => {
        const parts = prazoStr.split('/');
        if (parts.length !== 3) return false;
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1000) return false;
        const dateObj = new Date(year, month - 1, day);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() !== month - 1 || dateObj.getDate() !== day) return false;
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        return dateObj >= hoje;
    };

    const abrirModal = (tarefa?: Tarefa) => {
        if (tarefa) {
            setEditando(tarefa);
            setTitulo(tarefa.titulo);
            setDescricao(tarefa.descricao);
            const dataPrazo = new Date(tarefa.prazo);
            setData(dataPrazo);
            setPrazo(dataPrazo.toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
            setCategoria(tarefa.categoria || categorias[0]);
        } else {
            setEditando(null);
            setTitulo('');
            setDescricao('');
            const hoje = new Date();
            setData(hoje);
            setPrazo(hoje.toLocaleDateString('pt-BR'));
            setCategoria(categorias[0]);
        }
        setMostrarModal(true);
    };

    const salvar = async () => {
        if (!titulo.trim()) {
            Alert.alert('Opa!', 'O título é obrigatório.');
            return;
        }

        let dataParaSalvar = data;

        if (Platform.OS === 'web') {
            if (!isPrazoValido(prazo)) {
                Alert.alert('Data Inválida', 'Por favor, insira uma data válida e que não seja no passado.');
                return;
            }
            const parts = prazo.split('/');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            dataParaSalvar = new Date(year, month, day);
        }

        const dadosTarefa = {
            titulo,
            descricao,
            prazo: dataParaSalvar.toISOString(),
            categoria,
            user: pb.authStore.model?.id,
            concluida: editando ? editando.concluida : false
        };

        try {
            if (editando) {
                await pb.collection('tarefas').update(editando.id, dadosTarefa);
            } else {
                await pb.collection('tarefas').create(dadosTarefa);
            }
            setMostrarModal(false);
            carregarTarefas();
        } catch (error) {
            console.error("Erro ao salvar tarefa:", JSON.stringify(error));
            Alert.alert("Erro", "Não foi possível salvar a tarefa.");
        }
    };

    const excluir = async (id: string) => {
        Alert.alert(
            "Excluir Tarefa",
            "Você tem certeza que deseja excluir esta tarefa?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            await pb.collection('tarefas').delete(id);
                            carregarTarefas();
                        } catch (error) {
                            console.error("Erro ao excluir tarefa:", error);
                            Alert.alert("Erro", "Não foi possível excluir a tarefa.");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const toggleConcluida = async (tarefa: Tarefa) => {
        try {
            await pb.collection('tarefas').update(tarefa.id, {
                concluida: !tarefa.concluida,
            });
            setLista(prevLista =>
                prevLista.map(t =>
                    t.id === tarefa.id ? { ...t, concluida: !t.concluida } : t
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            Alert.alert("Erro", "Não foi possível atualizar o status da tarefa.");
        }
    };

    const limparFiltros = () => {
        setFiltroCategoria(null);
        setFiltroData(null);
    }

    const renderTarefa = ({ item }: { item: Tarefa }) => (
        <TarefaCard
            item={item}
            onEdit={abrirModal}
            onDelete={excluir}
            onToggleConcluida={toggleConcluida}
        />
    );

    const renderHeader = () => (
        <>
            <Text style={styles.header}>Minhas Tarefas</Text>
            <View style={styles.filtroContainer}>
                <View style={styles.pickerContainerFiltro}>
                    <Picker
                        selectedValue={filtroCategoria || 'todas'}
                        onValueChange={(itemValue) => setFiltroCategoria(itemValue === 'todas' ? null : itemValue)}
                    >
                        <Picker.Item label="Todas as Categorias" value="todas" />
                        {categorias.map((cat) => (<Picker.Item key={cat} label={cat} value={cat} />))}
                    </Picker>
                </View>
                <View style={styles.filtroBotoesContainer}>
                    <TouchableOpacity onPress={() => setMostrarFiltroData(true)} style={styles.filtroBotao}>
                        <Ionicons name="calendar-outline" size={20} color="#0D47A1" />
                        <Text style={styles.filtroBotaoTexto}>
                            {filtroData ? filtroData.toLocaleDateString('pt-BR') : 'Data'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={limparFiltros} style={styles.filtroBotao}>
                        <Ionicons name="close-circle-outline" size={20} color="#E57373" />
                        <Text style={[styles.filtroBotaoTexto, { color: '#E57373' }]}>Limpar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );

    if (loading) {
        return (
            <View style={styles.containerLoading}>
                <ActivityIndicator size="large" color="#0D47A1" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={listaFiltrada}
                renderItem={renderTarefa}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa encontrada.</Text>}
            />

            <TouchableOpacity style={styles.fab} onPress={() => abrirModal()}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <AppModal
                visible={mostrarModal}
                title={editando ? 'Editar Tarefa' : 'Nova Tarefa'}
                onRequestClose={() => setMostrarModal(false)}
            >
                <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={styles.input} />
                <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />

                {Platform.OS === 'web' ? (
                    <MaskInput value={prazo} onChangeText={(masked) => setPrazo(masked)} mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} placeholder="DD/MM/AAAA" keyboardType="numeric" style={styles.input} />
                ) : (
                    <TouchableOpacity onPress={() => setMostrarDatePicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.datePickerButtonText}>Prazo: {data.toLocaleDateString('pt-BR')}</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.pickerContainer}>
                    <Picker selectedValue={categoria} onValueChange={(itemValue) => setCategoria(itemValue)}>
                        {categorias.map((cat, index) => (<Picker.Item key={index} label={cat} value={cat} />))}
                    </Picker>
                </View>

                <View style={styles.modalBotoes}>
                    <Button title="Cancelar" onPress={() => setMostrarModal(false)} color="gray" />
                    <Button title="Salvar" onPress={salvar} />
                </View>
            </AppModal>

            {mostrarDatePicker && Platform.OS !== 'web' && (
                <DateTimePicker testID="dateTimePicker" value={data} mode="date" is24Hour={true} display="default" onChange={onChangeDate} />
            )}

            {mostrarFiltroData && (
                <DateTimePicker testID="filtroDateTimePicker" value={filtroData || new Date()} mode="date" display="default" onChange={onFiltroDataChange} />
            )}

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0D47A1',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    filtroContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    pickerContainerFiltro: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
    },
    filtroBotoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    filtroBotao: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#E6F3FF',
    },
    filtroBotaoTexto: {
        marginLeft: 5,
        color: '#0D47A1',
        fontWeight: 'bold',
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center'
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
    vazio: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#777',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
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
    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});