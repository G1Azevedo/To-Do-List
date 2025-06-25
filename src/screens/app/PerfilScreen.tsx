import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import pb from '../../services/pocketbase';
import { saveAuthToken, deleteAuthToken } from '../../services/authStorage';
import AppModal from '../../components/AppModal'; // Importando o novo componente

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

type Props = {
    navigation: PerfilScreenNavigationProp;
};

export default function PerfilScreen({ navigation }: Props) {
    const [modalSenhaVisivel, setModalSenhaVisivel] = useState(false);
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [erroModal, setErroModal] = useState('');

    const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false);
    const [senhaExclusao, setSenhaExclusao] = useState('');

    const handleLogout = async () => {
        try {
            pb.authStore.clear();
            await deleteAuthToken();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            Alert.alert("Erro", "Não foi possível sair da conta.");
            console.error("Erro ao fazer logout:", error);
        }
    };

    const abrirModalSenha = () => {
        setSenhaAntiga('');
        setNovaSenha('');
        setConfirmarNovaSenha('');
        setErroModal('');
        setModalSenhaVisivel(true);
    };

    const handleUpdatePassword = async () => {
        setErroModal('');
        if (!senhaAntiga || !novaSenha || !confirmarNovaSenha) {
            setErroModal('Todos os campos são obrigatórios.');
            return;
        }
        if (novaSenha.length < 6) {
            setErroModal('A nova senha deve ter no mínimo 6 caracteres.');
            return;
        }
        if (novaSenha !== confirmarNovaSenha) {
            setErroModal('As novas senhas não coincidem.');
            return;
        }

        setLoading(true);
        try {
            const userId = pb.authStore.model?.id;
            const userEmail = pb.authStore.model?.email;
            if (!userId || !userEmail) throw new Error("Usuário não encontrado");

            await pb.collection('users').update(userId, {
                oldPassword: senhaAntiga,
                password: novaSenha,
                passwordConfirm: confirmarNovaSenha,
            });

            await pb.collection('users').authWithPassword(userEmail, novaSenha);

            const authJson = JSON.stringify(pb.authStore);
            await saveAuthToken(authJson);

            setLoading(false);
            setModalSenhaVisivel(false);
            Alert.alert('Sucesso!', 'Sua senha foi alterada.');

        } catch (error: any) {
            console.error("Erro ao atualizar senha:", JSON.stringify(error));
            setErroModal('A senha atual está incorreta.');
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!senhaExclusao) {
            setErroModal('Por favor, digite sua senha para confirmar.');
            return;
        }

        setLoading(true);
        setErroModal('');

        try {
            const userEmail = pb.authStore.model?.email;
            const userId = pb.authStore.model?.id;
            if (!userEmail || !userId) throw new Error("Usuário não autenticado.");

            await pb.collection('users').authWithPassword(userEmail, senhaExclusao);

            await pb.collection('users').delete(userId);

            Alert.alert('Conta Excluída', 'Sua conta e todos os seus dados foram removidos.');
            handleLogout();

        } catch (error) {
            setLoading(false);
            setErroModal('Senha incorreta. A exclusão foi cancelada.');
            console.error("Erro ao tentar excluir conta:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title="Trocar Senha"
                    onPress={abrirModalSenha}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Sair da Conta"
                    onPress={handleLogout}
                    color="#E57373"
                />
            </View>
            <TouchableOpacity onPress={() => setModalExcluirVisivel(true)} style={styles.deleteTextContainer}>
                <Text style={styles.deleteText}>Excluir conta permanentemente</Text>
            </TouchableOpacity>

            <AppModal
                visible={modalSenhaVisivel}
                title="Alterar Senha"
                onRequestClose={() => setModalSenhaVisivel(false)}
            >
                <TextInput
                    placeholder="Senha Atual"
                    value={senhaAntiga}
                    onChangeText={setSenhaAntiga}
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    placeholder="Nova Senha"
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    placeholder="Confirmar Nova Senha"
                    value={confirmarNovaSenha}
                    onChangeText={setConfirmarNovaSenha}
                    secureTextEntry
                    style={styles.input}
                />

                {erroModal ? <Text style={styles.modalErrorText}>{erroModal}</Text> : null}

                <View style={styles.modalButtons}>
                    <Button title="Cancelar" onPress={() => setModalSenhaVisivel(false)} color="gray" />
                    <Button title={loading ? "Salvando..." : "Salvar"} onPress={handleUpdatePassword} disabled={loading} />
                </View>
            </AppModal>

            <AppModal
                visible={modalExcluirVisivel}
                title="Excluir Conta"
                onRequestClose={() => setModalExcluirVisivel(false)}
            >
                <Text style={styles.modalSubTitle}>
                    Esta ação é irreversível. Para confirmar, por favor, digite sua senha atual.
                </Text>

                <TextInput
                    placeholder="Digite sua senha"
                    value={senhaExclusao}
                    onChangeText={setSenhaExclusao}
                    secureTextEntry
                    style={styles.input}
                />

                {erroModal ? <Text style={styles.modalErrorText}>{erroModal}</Text> : null}

                <View style={styles.modalButtons}>
                    <Button title="Cancelar" onPress={() => setModalExcluirVisivel(false)} color="gray" />
                    <Button title={loading ? "Excluindo..." : "Excluir"} onPress={handleDeleteAccount} disabled={loading} color="red" />
                </View>
            </AppModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    buttonContainer: {
        marginBottom: 15,
    },
    modalSubTitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
        padding: 10,
        fontSize: 16,
    },
    modalErrorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    deleteTextContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    deleteText: {
        color: 'red',
        textDecorationLine: 'underline'
    }
});