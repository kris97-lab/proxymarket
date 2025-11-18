import { useEffect, useState, useCallback } from 'react';
import { fetchMarkets } from '../lib/api';

export interface MarketSummary {
  id?: string;
  question?: string;
  description?: string;
  volume?: number;
  closed?: boolean;
  active?: boolean;
  tags?: string[];
  current_yes_price?: number;
  current_no_price?: number;
  title?: string;
  probability?: number;
  endDate?: string;
}

export function useMarkets(limit = 20) {
  const [markets, setMarkets] = useState<MarketSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMarkets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMarkets(limit);
      const parsed = Array.isArray(data) ? data : data.markets || [];
      setMarkets(parsed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load markets';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadMarkets();
  }, [loadMarkets]);

  return { markets, loading, error, refresh: loadMarkets };
}
