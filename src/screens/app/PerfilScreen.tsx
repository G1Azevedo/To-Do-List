import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import pb from '../../services/pocketbase';
import { deleteAuthToken } from '../../services/authStorage';

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

type Props = {
    navigation: PerfilScreenNavigationProp;
};

export default function PerfilScreen({ navigation }: Props) {
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

    const handleChangePassword = () => {
        Alert.alert(
            'Em breve',
            'A funcionalidade de troca de senha será implementada futuramente.'
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title="Trocar Senha"
                    onPress={handleChangePassword}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Sair da Conta"
                    onPress={handleLogout}
                    color="#E57373"
                />
            </View>
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
});