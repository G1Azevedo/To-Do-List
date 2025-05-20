import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prazo, setPrazo] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      <View style={styles.form}>
        <Text>Título</Text>
        <TextInput
          placeholder="Digite o título da tarefa"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
        />

        <Text>Descrição</Text>
        <TextInput
          placeholder="Digite a descrição"
          value={descricao}
          onChangeText={setDescricao}
          style={styles.input}
        />

        <Text>Prazo</Text>
        <TextInput
          placeholder="Digite o prazo (ex: 25/05/2025)"
          value={prazo}
          onChangeText={setPrazo}
          style={styles.input}
        />

        <Button title="Salvar" onPress={() => { }} />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 10,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
