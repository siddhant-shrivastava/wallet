import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const setupWallet = async (name, balance) => {
    try {
        const response = await api.post('/setup', { name, balance });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Failed to setup wallet';
    }
};

export const getWalletDetails = async (walletId) => {
    try {
        const response = await api.get(`/wallet/${walletId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Failed to fetch wallet details';
    }
};

export const addTransaction = async (walletId, amount, description) => {
    try {
        const response = await api.post(`/transact/${walletId}`, { amount, description });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Failed to add transaction';
    }
};

export const fetchTransactions = async (walletId, skip = 0, limit = 10) => {
    try {
        const response = await api.get(`/transactions?walletId=${walletId}&skip=${skip}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Failed to fetch transactions';
    }
};