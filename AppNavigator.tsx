// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Defina os tipos para suas rotas
export type RootStackParamList = {
    // Adicione as rotas conforme são implementadas
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            {/* As telas serão adicionadas aqui */}
        </Stack.Navigator>
    );
}