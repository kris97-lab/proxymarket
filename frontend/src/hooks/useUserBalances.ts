import { useEffect, useState, useCallback } from 'react';
import { fetchUserBalances } from '../lib/api';

interface Balance {
  asset: string;
  available: number;
  locked?: number;
}

export function useUserBalances(walletAddress?: string) {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBalances = useCallback(async () => {
    if (!walletAddress) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserBalances(walletAddress);
      const parsed = Array.isArray(data) ? data : data.balances || [];
      setBalances(parsed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load balances';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    loadBalances();
  }, [loadBalances]);

  return { balances, loading, error, refresh: loadBalances };
}
