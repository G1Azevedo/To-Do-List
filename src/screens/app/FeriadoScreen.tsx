import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { getFeriados, Feriado } from '../../services/brasilApiService';

export default function FeriadosScreen() {
    const [feriados, setFeriados] = useState<Feriado[]>([]);
    const [loading, setLoading] = useState(true);
    const [ano, setAno] = useState(new Date().getFullYear());

    useEffect(() => {
        const carregarFeriados = async () => {
            setLoading(true);
            const dados = await getFeriados(ano);
            setFeriados(dados);
            setLoading(false);
        };

        carregarFeriados();
    }, [ano]);

    const renderItem = ({ item }: { item: Feriado }) => (
        <View style={styles.card}>
            <Text style={styles.nomeFeriado}>{item.name}</Text>
            <Text style={styles.dataFeriado}>
                {new Date(item.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </Text>
        </View>
    );

    if (loading) {
        return (
            <View style={[styles.container, styles.containerLoading]}>
                <ActivityIndicator size="large" color="#0D47A1" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title="<" onPress={() => setAno(ano - 1)} />
                <Text style={styles.titulo}>Feriados Nacionais de {ano}</Text>
                <Button title=">" onPress={() => setAno(ano + 1)} />
            </View>
            <FlatList
                data={feriados}
                renderItem={renderItem}
                keyExtractor={(item) => item.date}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerLoading: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f2f2f2',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0D47A1',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    nomeFeriado: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dataFeriado: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
});