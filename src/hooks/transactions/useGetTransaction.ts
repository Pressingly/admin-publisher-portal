import { useState, useEffect } from 'react';

import { getTransactions, Transaction } from '~/core/revenueApiClient/endpoints/transaction'

const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactions();

        setTransactions(data);
      } catch (err) {
        setError(err as never);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  return { transactions, loading, error };
};

export default useGetTransactions;
