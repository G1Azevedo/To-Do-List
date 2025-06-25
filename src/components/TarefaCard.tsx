import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tarefa } from '../model/Tarefa';

interface TarefaCardProps {
    item: Tarefa;
    onEdit: (tarefa: Tarefa) => void;
    onDelete: (id: string) => void;
    onToggleConcluida: (tarefa: Tarefa) => void;
}

export default function TarefaCard({ item, onEdit, onDelete, onToggleConcluida }: TarefaCardProps) {
    return (
        <View style={[styles.card, item.concluida && styles.tarefaConcluida]}>
            <View style={styles.conteudoCard}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text>{item.descricao}</Text>
                <Text style={styles.prazo}>
                    Prazo: {new Date(item.prazo).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                </Text>
            </View>
            <View style={styles.colunaAcoes}>
                <View style={styles.categoriaTag}>
                    <Text style={styles.categoriaTexto}>{item.categoria}</Text>
                </View>
                <View style={styles.botoes}>
                    <TouchableOpacity style={[styles.botao, styles.editar]} onPress={() => onEdit(item)}>
                        <Ionicons name="pencil-outline" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.botao, styles.excluir]} onPress={() => onDelete(item.id)}>
                        <Ionicons name="trash-outline" size={22} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.botao, styles.concluir]} onPress={() => onToggleConcluida(item)}>
                        <Ionicons name={item.concluida ? "refresh-circle-outline" : "checkmark-circle-outline"} size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        elevation: 2,
    },
    conteudoCard: {
        flex: 1,
        marginRight: 10,
    },
    colunaAcoes: {
        alignItems: 'flex-end',
    },
    categoriaTag: {
        backgroundColor: '#0D47A1',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginBottom: 10,
        alignSelf: 'flex-end',
    },
    categoriaTexto: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    tarefaConcluida: {
        opacity: 0.5,
        backgroundColor: '#e0e0e0',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    prazo: {
        fontSize: 12,
        color: '#555',
        marginTop: 5,
    },
    botoes: {
        flexDirection: 'row',
        gap: 8,
    },
    botao: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },
    concluir: {
        backgroundColor: '#4CAF50',
    },
    editar: {
        backgroundColor: '#FFD54F',
    },
    excluir: {
        backgroundColor: '#E57373',
    }
});