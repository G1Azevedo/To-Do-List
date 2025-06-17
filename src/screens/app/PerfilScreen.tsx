import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

type Props = {
    navigation: PerfilScreenNavigationProp;
};

export default function PerfilScreen({ navigation }: Props) {
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
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