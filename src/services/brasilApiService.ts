import axios from 'axios';
export interface Feriado {
    date: string;
    name: string;
    type: string;
}

const apiClient = axios.create({
    baseURL: 'https://brasilapi.com.br/api',
});


export const getFeriados = async (ano: number): Promise<Feriado[]> => {
    try {
        const response = await apiClient.get(`/feriados/v1/${ano}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar feriados:", error);
        return [];
    }
};