import apiClient from '../revenueApi';

export interface Transaction {}

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await apiClient.get<Transaction[]>('/transactions');

  return response.data;
};
