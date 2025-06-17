import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'pocketbase_auth';

export async function saveAuthToken(tokenData: string) {
    if (Platform.OS === 'web') {
        try {
            await AsyncStorage.setItem(AUTH_KEY, tokenData);
        } catch (e) {
            console.error('Failed to save auth token to AsyncStorage', e);
        }
    } else {
        try {
            await SecureStore.setItemAsync(AUTH_KEY, tokenData);
        } catch (e) {
            console.error('Failed to save auth token to SecureStore', e);
        }
    }
}

export async function getAuthToken(): Promise<string | null> {
    if (Platform.OS === 'web') {
        try {
            return await AsyncStorage.getItem(AUTH_KEY);
        } catch (e) {
            console.error('Failed to fetch auth token from AsyncStorage', e);
            return null;
        }
    } else {
        try {
            return await SecureStore.getItemAsync(AUTH_KEY);
        } catch (e) {
            console.error('Failed to fetch auth token from SecureStore', e);
            return null;
        }
    }
}

export async function deleteAuthToken() {
    if (Platform.OS === 'web') {
        try {
            await AsyncStorage.removeItem(AUTH_KEY);
        } catch (e) {
            console.error('Failed to delete auth token from AsyncStorage', e);
        }
    } else {
        try {
            await SecureStore.deleteItemAsync(AUTH_KEY);
        } catch (e) {
            console.error('Failed to delete auth token from SecureStore', e);
        }
    }
}